import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import {startCase, camelCase} from 'lodash'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-emp-dept',
  templateUrl: './emp-dept.component.html',
  styleUrls: ['./emp-dept.component.scss']
})
export class EmpDeptComponent {
  
  @ViewChild('closeButton') closeButton;
  @ViewChild('closeButtonDelete') closeButtonDelete;


  departments: any[] = [];
  isLoading: boolean;
  deptForm: FormGroup;
  editDept: FormGroup;
  selectedDept: any;
  designations: any[] = [];

  designForm: FormGroup;
  editDesign: FormGroup;
  selectedDesign: any;
  selectedRow:any;
  tableHeader:any;
  tableHeaderDesignation:any;
  modalRef!: BsModalRef;
  @ViewChild('template', { read: TemplateRef }) editTemplate:TemplateRef<any>;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  @ViewChild('DesignationTemplate', { read: TemplateRef }) editDesignationTemplate:TemplateRef<any>;
  @ViewChild('DesignationDeletemplate', { read: TemplateRef }) deleteDesignationTemplate:TemplateRef<any>;
  constructor(private api: ApiService, private toastr: ToastrService,private modalService: BsModalService) {
    this.deptForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),

    });

    this.editDept = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      department: new FormControl(null)

    });
    this.designForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required])

    });

    this.editDesign = new FormGroup({
      id:new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required])
    });
  
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getDesignations();
    this.tableHeaderDesignation = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "deptName", dataType: "string", title: 'Department Name', sort: true, visible: true, search:true },
        {  field: "name", dataType: "string", title: 'Designation Name', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false }
       ],
      searchPlaceholder:"Search by Department Name & Designation Name",
      sortBy: { field: 'name', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {         
          empEdit: {
            show: true,
            callback: () => {
              
            },
          },
          empDelete: {
            show: true,
            callback: () => {
              // $('#detail-grievance').modal('show')
  
            },
          },
        },
      },
    };
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "name", dataType: "string", title: 'Name', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false }
       ],
      searchPlaceholder:"Search by Name",
      sortBy: { field: 'name', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {         
          empEdit: {
            show: true,
            callback: () => {
              
            },
          },
          empDelete: {
            show: true,
            callback: () => {
              // $('#detail-grievance').modal('show')
  
            },
          },
        },
      },
    }
  }

  getDepartments()
  {
    this.api.getDepartments().subscribe(resp => {
      console.log(resp);
      
      this.departments = resp.departments
    });
  }

  addDepartment()
  {
    this.isLoading = true;
    this.deptForm.controls['name'].setValue(startCase(camelCase(this.deptForm.value.name)));
    this.api.addDepartment(this.deptForm.value).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;

      this.toastr.success(resp.message, "Department add success");
      this.deptForm.reset();
      this.getDepartments();
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Department add failed");
      console.error(err);
    })
  }

  setDepartment(dept: any)
  {
    this.selectedDept = dept;
    this.editDept.patchValue({name: dept.name});
  }

  updateDepartment()
  {
    this.isLoading = true;
    this.deptForm.controls['name'].setValue(startCase(camelCase(this.deptForm.value.name)));
    this.api.updateDepartment(this.selectedDept._id, this.editDept.value).subscribe(resp => {
      this.isLoading = false;
      this.closePopup();
      this.toastr.success(resp.message, "Department update success");
      this.getDepartments();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Department update failed");
      console.error(err);
    })
  }

  deleteDepartment()
  {
    this.isLoading = true;
    this.api.deleteDepartment(this.selectedDept._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      this.toastr.success(resp.message, "Department Deleted Success");
      this.closePopup();
      this.getDepartments();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }

  getDesignations()
  {
    this.api.getDesignations().subscribe(resp => {
         this.designations = resp.designations;
         this.designations.forEach(element => {
          element['deptName'] =element.department?.name
         });
    });
  }

  addDesignation()
  {
    console.log(this.designForm.value);
    
    this.isLoading = true;
    this.designForm.controls['name'].setValue(startCase(camelCase(this.designForm.value.name)));
    this.api.addDesignation(this.designForm.value).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;

      this.toastr.success(resp.message, "Designation  add success");
      this.designForm.reset();
      this.getDesignations();
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Department add failed");
      console.error(err);
    })
  }

  setDesignation(dept: any)
  {
    console.log(dept);
    this.selectedDesign = dept;
    this.editDesign.patchValue({
      id:dept?._id,
      name: dept.name, department : dept.department?.name});
  }

  updateDesignation()
  {
    this.isLoading = true;
    this.editDesign.controls['name'].setValue(startCase(camelCase(this.editDesign.value.name)));
    const payload = {
      id :this.selectedDesign?._id,
      name:this.editDesign.value?.name,
     description:'',
     department:this.selectedDesign?.department
    };
    this.api.updateDesignation(this.selectedDesign._id,payload).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;

      // document.getElementById('editModalDismissBtn')?.click();
      this.toastr.success(resp.message, "Designations update success");
     this.closePopup();
      this.getDesignations();
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Designations update failed");
      console.error(err);
    })
  }

  deleteDesignation()
  {
    this.isLoading = true;
    this.api.deleteDesignation(this.selectedDesign._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      this.toastr.success(resp.message, "Designations Delete Success");
      this.closePopup();
      this.getDesignations();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }

  onChangeClass(event){
    this.designations =[];
    this.designForm.patchValue({department: 'select'});
    const id = event.target.value;
    this.departments.forEach(element => {
        if(element._id === id) {
          this.designations = element.designations;
          console.log(this.designations);
          
        }
    });
  } 
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'empEdit'){
      this.openModal(this.editTemplate, this.selectedRow)
    }
    if($event['event'] === 'empDelete'){
      this.openDeleteModal(this.deleteTemplate, this.selectedRow)
    }

  }
  openModal(template: TemplateRef<any>, data: any) {
    this.setDepartment(data);
    this.modalRef = this.modalService.show(template);
  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.selectedDept = data;
    this.modalRef = this.modalService.show(template);
  }
  closePopup(){
    this.modalRef.hide();
  }
  rowEventDesignation($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'empEdit'){
      this.openModalDesignation(this.editDesignationTemplate, this.selectedRow)
    }
    if($event['event'] === 'empDelete'){
      this.openDeleteModalDesignation(this.deleteDesignationTemplate, this.selectedRow)
    }

  }
  openModalDesignation(template: TemplateRef<any>, data: any) {
    this.setDesignation(data);
    this.modalRef = this.modalService.show(template);
  }
  openDeleteModalDesignation(template: TemplateRef<any>, data: any){
    this.selectedDesign = data;
    this.modalRef = this.modalService.show(template);
  }
}
