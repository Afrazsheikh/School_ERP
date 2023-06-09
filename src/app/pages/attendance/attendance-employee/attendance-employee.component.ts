import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-attendance-employee',
  templateUrl: './attendance-employee.component.html',
  styleUrls: ['./attendance-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AttendanceEmployeeComponent implements OnInit {
  designations: any[] = [];
  today = new Date();
  addForm: FormGroup;
  rows: FormArray;
  pageNo = 1;
  p: number = 1;
  pagingConfig = {
    'currentPage': 1,
    'itemsPerPage': 5,
    'totalItems': 0
  }
  employees: any[] = [];
  departmentDrp: string = "";

  constructor(private api: ApiService,
    public fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    this.today.setDate(this.today.getDate() - 1);
    this.createForm();
    this.rows = this.fb.array([]);
    this.addForm.addControl('rows', this.rows);
  }
  ngOnInit() {
    this.getDesignations();
  }
  createForm() {
    this.addForm = this.fb.group({
      designation: ['', Validators.required],
      date: ['', Validators.required],
    });
  }
  onAddRow(data) {
    this.rows.push(this.createItemFormGroup(data));
  }
  createItemFormGroup(data): FormGroup {
    console.log(data);
    return this.fb.group({
      _id: [data?._id],
      image: [data?.marksId],
      name: [data?.name],
      status: [data?.status],
      remark: [data?.practical],
    });
  }
  removeGroup() {
    const controlData = this.addForm.get('rows') as FormArray;
    controlData.clear();
    this.addForm.updateValueAndValidity();
  }
  getDesignations() {
    this.api.getDesignations().subscribe(resp => {
      this.designations = resp.designations;
    });
  }
  getEmployees() {
    this.removeGroup();
    this.spinner.show();
    this.pageNo = this.pagingConfig.currentPage;
    this.api.getEmployeesByPageNo(this.pageNo - 1, this.departmentDrp).subscribe(resp => {
      this.spinner.hide();
      this.employees = resp.employees;

      this.employees.forEach(element => {
        var employeeobj: any;
          employeeobj = {
          _id: [element?._id],
          image: [element?.image],
          name: [element?.name],
          status: [element?.status],
          remark: [element?.remark],
        };
        this.onAddRow(employeeobj);
        this.addForm.updateValueAndValidity();
      });

      this.pagingConfig.totalItems = resp['totalCount'];
    }, (err) => {
      this.spinner.hide();
      this.employees = [];
      this.toastr.error(err);
    })
  }
  filterEmployee(addForm) {
    this.departmentDrp = addForm.value.designation;
    this.getEmployees();
  }
  pageChanged(event: any): void {
    this.pagingConfig.currentPage = event;
    this.getEmployees();
  }
  statusChange(event)
  {
  this.rows.controls.forEach(element => {
    element.get('status').setValue(event.target.value);
  });
  }
  saveEmployeeAttendance()
  {
    console.log(this.addForm.value); 
    ;
  }
}
