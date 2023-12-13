import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { BsModalService ,BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-assign-vehicle',
  templateUrl: './assign-vehicle.component.html',
  styleUrls: ['./assign-vehicle.component.scss']
})
export class AssignVehicleComponent {
  @ViewChild('editClassTemplate', { read: TemplateRef }) editTemplate:TemplateRef<any>;
@ViewChild('deleteClassTemplate', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  modalRef!: BsModalRef;
  assigns: any[] = []
  routes: any[] = [];
  vehicles: any;
  stopPages: any[] = []; 
  vAssignForm: FormGroup;
  editExpense: FormGroup;
  tableHeader: any
  selectedAssign: any;
  isLoading: boolean;
  ExpensForm :FormGroup
  doc1: any;
  doc2: any;
  doc3: any;
  selectedEnqaa: any;
  // cart_detail: Array<any> = [];
  getVehcileID:  string;
  vehiclesId: String;
  selectedExpense: any;
  expenseData: any;
  allExpenses:  any[] = []
  mergedArray: any[];
  selectedRow: any;
  selectedDesign: any;
  flattenAssigns: any[];
  mergedAssignArray: any[];
  ROUTE: any[];
  STOPPAGE: any[];
  mergedArrayNew: any[];


  constructor(private api: ApiService, private toastr: ToastrService, private router: Router, private modalService: BsModalService)
  {
    this.vAssignForm = new FormGroup({
      route: new FormControl("select", [Validators.required]),
      stoppage: new FormControl("select", [Validators.required]),
      vehicle: new FormControl("select", [Validators.required]),
    });

    this.ExpensForm = new FormGroup({
      vehicleId: new FormControl("select", [Validators.required]),
      expenseName: new FormControl(null, [Validators.required]),
      expenseValue: new FormControl(null, [Validators.required]),
      expenseTime: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
    this.editExpense = new FormGroup({
      // vehicleId: new FormControl("select", [Validators.required]),

      expenseId: new FormControl("select", [Validators.required]),
      expenseName: new FormControl(null, [Validators.required]),
      expenseValue: new FormControl(null, [Validators.required]),
      expenseTime: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      // description: new FormControl(null, [Validators.required]),

    })
  }
data:any
  ngOnInit(): void {
    this.getAllVehicleAssigns();
    this.getAllRoutes();
    // this.getAllVehiclesData()
  

  }

  getAllVehicleAssigns()
  {
   
    this.tableHeader = {
      data: [
        { field: "autoNo", dataType: "autoNo", title: 'S. No', sort: false, visible: true, search: false },
        { field: "routeFare", dataType: "string", title: 'Route Name', sort: true, visible: true, search: true },
        { field: "startPlace", dataType: "string", title: 'Start Place', sort: true, visible: true, search: true },
        { field: "stoppageName", dataType: "string", title: 'Stop page', sort: true, visible: true, search: true },
        { field: "stopTime", dataType: "string", title: 'Time', sort: true, visible: true, search: true },
        { field: 'action', dataType: 'action', title: 'Action', sort: false, visible: true, search: false }
      ],
      searchPlaceholder: "Search by startPlace, stoppageName, and time",
      sortBy: { field: 'distance', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {
          edit: {
            show: true,
            callback: () => {
              // Handle edit action
            },
          },
          delete: {
            show: true,
            callback: () => {
              // Handle delete action
            },
          },
        },
      },
    };
  

    
    // this.api.getAllVehicleAssigns().subscribe(resp => {       
      // this.assigns = resp.vehicleRoutes;
      // console.log(this.assigns);
      // const routeArrayValues = this.assigns.map(assign => assign.route);
      // const stoppageArray = this.assigns.map(assign => assign.stoppage);
      this.api.getAllVehicleAssigns().subscribe(resp => { 
        console.log(resp);
        
        this.assigns = resp.vehicleRoutes;
      
        this.assigns.forEach((stopage, index) => {
          if (stopage.stoppage) {
              const stoppageDetails = {
                autoNo: index + 1, 
                routeFare: stopage.stoppage.routeFare,
                stopTime: stopage.stoppage.stopTime,
                stoppageName: stopage.stoppage.stoppageName,
                Id: stopage.stoppage._id,
              };
              this.STOPPAGE = [];
              this.STOPPAGE.push(stoppageDetails);
          }
        });
        this.assigns.forEach((assign, index) => {
          if (assign.route) {
        
              const routeDetails = {
                autoNo: index + 1, 
                routeName: assign.route.routeName,
                startPlace: assign.route.startPlace,
                stopPlace: assign.route.stopPlace,
                RouteId: assign.route._id,
              };
            this.  ROUTE = []
              this.ROUTE.push(routeDetails);
       
          }
        });

        for (let i = 0; i < Math.max(this.ROUTE.length, this.STOPPAGE.length); i++) {
          const routeItem = this.ROUTE[i] || {};
          const stoppageItem = this.STOPPAGE[i] || {};
        
          const mergedItem = {
            autoNo: routeItem.autoNo || stoppageItem.autoNo,
            routeName: routeItem.routeName,
            startPlace: routeItem.startPlace,
            stopPlace: routeItem.stopPlace,
            RouteId: routeItem.Id,
            routeFare: stoppageItem.routeFare,
            stopTime: stoppageItem.stopTime,
            stoppageName: stoppageItem.stoppageName,
          };
        this.  mergedArrayNew = []
          this.mergedArrayNew.push(mergedItem);
        }
  
  
      });
     
  //     // this.assigns =routeArrayValues.concat(stoppageArray);

  //     console.log(this.assigns);

      
    // });
  }

  onFilesDropped(files: NgxFileDropEntry[], imgType: string)
  {
    if(files.length > 1) {
      alert('Please upload a single file');
    }
    else
    {
      for(const droppedFile of files) {
        if(droppedFile.fileEntry.isFile)
        {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            if(imgType == 'doc1') {
              this.doc1 = file;
            }
            else if(imgType == 'doc2') {
              this.doc2 = file;
            }
            else if(imgType == 'doc3') {
              this.doc3 = file;
            }
          })
        }
      }
    }
  }

  // For adding expense
  AddExpense()
  {

    let postData = new FormData();
    postData.append("vehicleId", this.ExpensForm.value.vehicleId);
    postData.append("expenseName", this.ExpensForm.value.expenseName);
    postData.append("expenseValue", this.ExpensForm.value.expenseValue);
    postData.append("expenseTime", moment(this.ExpensForm.value.expenseTime).format("DD-MM-YYYY"));
    postData.append("description", this.ExpensForm.value.description);

    if(this.doc1) {
      postData.append("expenseDocs1", this.doc1);
    }
    if(this.doc2) {
      postData.append("expenseDocs2", this.doc2);
    }
    if(this.doc3) {
      postData.append("expenseDocs3", this.doc3);
    }

    this.api.addExpensReport(postData).subscribe(resp => {
    this.getAllVehiclesData()
      this.isLoading = false;
      this.ExpensForm.reset();
      this.doc1 = this.doc2 = this.doc3 = null;
      this.toastr.success(resp.message, "Add Expense success");
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Add Expense failed");
      console.error(err);
    })
  }


  getAllRoutes()
  {
    this.api.getAllRoutes().subscribe(resp => {
      this.routes = resp.routes;
      this.getAllStopPages();
    });
  }

  getAllStopPages()
  {
    this.api.getAllStopPages().subscribe(resp => {
      this.stopPages = resp.stoppages;
      this.getAllVehiclesData();
    });
  }

  getAllVehiclesData()
  {
    this.tableHeader = {
      data: [
        { field: "autoNo", dataType: "autoNo", title: 'S. No', sort: false, visible: true, search: false },
        { field: "vehicleNo", dataType: "string", title: 'Vehicle Name', sort: true, visible: true, search: true },
        { field: "name", dataType: "string", title: 'Expense Name', sort: true, visible: true, search: true },
        { field: "amount", dataType: "string", title: 'Amount', sort: true, visible: true, search: true },
        { field: "time", dataType: "string", title: 'Time', sort: true, visible: true, search: true },
        { field: "description", dataType: "string", title: 'Description', sort: true, visible: true, search: true },
        { field: 'action', dataType: 'action', title: 'Action', sort: false, visible: true, search: false }
      ],
      searchPlaceholder: "Search by vehicleNo, amount, and time",
      sortBy: { field: 'distance', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {
          edit: {
            show: true,
            callback: () => {
              // Handle edit action
            },
          },
          delete: {
            show: true,
            callback: () => {
              // Handle delete action
            },
          },
        },
      },
    };
    this.api.getAllVehicles().subscribe((resp) => {
      this.vehicles = resp?.vehicles;
      this.allExpenses = [];
      this.vehicles.forEach((vehicle, index) => {
        if (vehicle.expenses && vehicle.expenses.length > 0) {
          vehicle.expenses.forEach((expense) => {
            const expenseDetails = {
              autoNo: index + 1, 
              vehicleNo: vehicle.vehicleNo,
              name: expense.name,
              amount: expense.amount,
              time: expense.time,
              description: expense.description,
              _id: expense._id,
          
            };
    
            this.allExpenses.push(expenseDetails);
          });
        }
      });
    
      this.mergedArray = this.allExpenses;
    });
     
  }
  getEdit(data){
    console.log(data);

  
this.editExpense.patchValue({
  // autoNo: data.autoNo,
  // vehicleId: data.vehicleNo,
  expenseName: data.name,
  expenseValue: data.amount,
  expenseTime: data.time,
  description: data.description
});
  }
  


  selectedEnq(vehd : any){

    
}
  assignVehicle()
  {
    this.isLoading = true;
    this.api.assignVehicle(this.vAssignForm.value).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, "Vehicle assign success");
      this.vAssignForm.reset();
      this.getAllVehicleAssigns();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Vehicle assign failed");
    });
  }

  editAssignVehicle(route: any)
  {
    console.log("dsa",route );
    
    this.selectedAssign = route;
    const navExtras: NavigationExtras = {
      state: {
        data: this.selectedAssign
      }
    };

    this.router.navigate(["/transport/assign/", this.selectedAssign._id], navExtras);
  }

  deleteAssignVehicle()
  {
    this.isLoading = true;
    this.api.deleteAssignVehicle(this.selectedAssign._id).subscribe(resp => {
      this.isLoading = false;
      document.getElementById('modalDismissBtn')?.click();
      this.getAllVehicleAssigns();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
  
  deleteVehicleExpen()
  {
   const expenseId =  this.selectedDesign._id
   const vehicleId = this.vehicles
   .filter(vehicle => vehicle.expenses.some(expense => expense._id === expenseId))
   .map(vehicle => vehicle._id)[0];

    this.isLoading = true;
    this.api.deleteVehicleExpense(expenseId, vehicleId).subscribe(resp => {
      this.isLoading = false;
      // document.getElementById('modalDismissBtn')?.click();
      this.closePopup()
      this.getAllVehiclesData();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
  updateExpense(){
    this.expenseData 
    

    this.isLoading = true;
    
    this.api.updateExpense(this.editExpense.value, this.expenseData._id).subscribe(resp => {
      console.log(resp);
      
      this.isLoading = false;
      this.toastr.success(resp.message, "  update success");
      document.getElementById('editModalDismissBtn')?.click();
      this.getAllVehiclesData();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "E update failed");
    })
  
  }

  onVehicleSelect(event: any): void {
    const selectedVehicleId = event;
    const selectedVehicle = this.vehicles.find(vehicle => vehicle._id === selectedVehicleId);
  
    if (selectedVehicle) {
      // Extract expenses from the selected vehicle
      const expenses = selectedVehicle.expenses || [];
  
      // Create an array with the necessary fields for the dynamic table
      const tableData = expenses.map((expense, index) => ({
        autoNo: index + 1,
        vehicleNo: selectedVehicle.vehicleNo,
        name: expense.name,
        amount: expense.amount,
        time: expense.time,
        description: expense.description, 
        vehicleId  :expense.selectedVehicle
      }));
  
      // Set the table data to be displayed
      this.mergedArray = tableData;
      console.log(this.mergedArray);
    }
  }

  closePopup(){
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>, data: any) {
    this.modalRef = this.modalService.show(template);
  }
  
  rowEvent($event: any) {
  
    this.selectedRow = $event.lead;
  
    if ($event['event'] === 'edit') {
      this.getEdit(this.selectedRow);

      this.openModal(this.editTemplate, this.selectedRow);
    }
  
    if ($event['event'] === 'delete') {
      this.selectedDesign = this.selectedRow;
      this.openModal(this.deleteTemplate, this.selectedRow);
    }

    
  }
  
  
  rowEventAssign($event: any) {
    this.selectedRow = $event.lead;
    if ($event['event'] === 'edit') {
      console.log("fsdf");
      
      this.editAssignVehicle(this.selectedRow);

      // this.openModal(this.editTemplate, this.selectedRow);
    }
  
    if ($event['event'] === 'delete') {
      this.selectedDesign = this.selectedRow;
      this.openModal(this.deleteTemplate, this.selectedRow);
    }

  
}
}
