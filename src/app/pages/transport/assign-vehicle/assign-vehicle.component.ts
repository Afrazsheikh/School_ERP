import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-assign-vehicle',
  templateUrl: './assign-vehicle.component.html',
  styleUrls: ['./assign-vehicle.component.scss']
})
export class AssignVehicleComponent {

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


  constructor(private api: ApiService, private toastr: ToastrService, private router: Router)
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
    this.getAllVehiclesData()
    this.tableHeader = {
      data: [
        { field: "autoNo", dataType: "autoNo", title: 'S. No', sort: false, visible: true, search: false },
        { field: "vehicleNo", dataType: "string", title: 'Vehicle Name', sort: true, visible: true, search: true },
        { field: "name", dataType: "string", title: 'Expense Name', sort: true, visible: true, search: true },
        { field: "amount", dataType: "string", title: 'Amount', sort: true, visible: true, search: true },
        { field: "time", dataType: "string", title: 'Time', sort: true, visible: true, search: true },
        { field: "description", dataType: "string", title: 'Description', sort: true, visible: true, search: true }
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

  }

  getAllVehicleAssigns()
  {
    this.api.getAllVehicleAssigns().subscribe(resp => { 
      this.assigns = resp.vehicleRoutes;
    });
  }
  // getAllVehicleExpense()
  // {
  //   this.api.getAllExapense().subscribe(resp => {
  //     this.assigns = resp.vehicleRoutes;
  //   });
  // }
 
  onFilesDropped(files: NgxFileDropEntry[], imgType: string)
  {
    console.log(files);
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
    console.log(this.ExpensForm.value);

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
    console.log(resp);
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
    
    
    this.api.getAllVehicles().subscribe((resp) => {
      this.vehicles = resp?.vehicles;
      this.allExpenses = [];
    
      this.vehicles.forEach((vehicle, index) => {
        // Check if expenses array exists and has items
        if (vehicle.expenses && vehicle.expenses.length > 0) {
          // Iterate through each expense in the vehicle
          vehicle.expenses.forEach((expense) => {
            // Extract properties from the expense and add the vehicle properties
            const expenseDetails = {
              autoNo: index + 1, // Assuming autoNo is the index + 1
              vehicleNo: vehicle.vehicleNo, // Replace 'vehicleNo' with the actual property name from your vehicle object
              name: expense.name,
              amount: expense.amount,
              time: expense.time,
              description: expense.description,
            };
    
            // Add the expenseDetails to the allExpenses array
            this.allExpenses.push(expenseDetails);
          });
        }
      });
    
      // Now allExpenses contains all expense details with vehicle properties
      console.log(this.allExpenses);
      this.mergedArray = this.allExpenses;
      console.log(this.mergedArray);
    });
    
  }
  getEdit(data){
    console.log(data);

    this.selectedExpense=data.expenses[0]._id
    this.expenseData = data.expenses[0]
    console.log(this.selectedExpense);
    console.log(this.expenseData._id);


    this.editExpense.patchValue({

      expenseId: this.expenseData._id,
      vehicleId: this.selectedExpense.vehicleNo,

      expenseName: data.expenses[0].name,

      expenseValue: this.expenseData.amount,
      expenseTime: this.expenseData.time ,
      description: this.expenseData.description,
    
    
  })
  }
  

  // getAllVehicleExoense()
  // {
  //   // this.cart_detail = this.vehiclesId
    
  //   this.api.getAllExapense(this.getVehcileID).subscribe(resp => {
  //   console.log(this.getVehcileID);
  //     this.vehicles = resp.vehicles;
      
  //     console.log(this.vehicles);
      
  //   });
  // }
  selectedEnq(vehd : any){
//console.log(vehd);
    
   // this.selectedEnqaa 
    //console.log(this.selectedEnqaa);

  

  
    
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
      console.log(resp);
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
    this.isLoading = true;
    this.api.deleteVehicleExpense(this.expenseData._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      document.getElementById('modalDismissBtn')?.click();
      this.getAllVehicleAssigns();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
  updateExpense(){
    this.expenseData 
    console.log(this.expenseData._id);
    

    this.isLoading = true;
    console.log(":this.editDistForm.value", this.editExpense.value);
    
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
        description: expense.description
      }));
  
      // Set the table data to be displayed
      this.mergedArray = tableData;
      console.log(this.mergedArray);
    }
  }
  
  
}
