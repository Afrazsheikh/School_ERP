import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import {startCase, camelCase} from 'lodash'
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
  // designation
  designations: any[] = [];

  designForm: FormGroup;
  editDesign: FormGroup;
  selectedDesign: any;

  constructor(private api: ApiService, private toastr: ToastrService) {
    this.deptForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),

    });

    this.editDept = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required])

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
      console.log(resp);

      this.isLoading = false;

      document.getElementById('editModalDismissBtn')?.click();
      this.toastr.success(resp.message, "Department update success");
      this.getDepartments();
    ;
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
      document.getElementById('modalDismissBtn')?.click();
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
      console.log(resp);
      
      this.designations = resp.designations
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
      this.closeButton.nativeElement?.click();
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
      this.closeButtonDelete.nativeElement?.click();
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
}
