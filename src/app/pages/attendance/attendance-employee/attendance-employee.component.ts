import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { default as _rollupMoment, Moment } from 'moment';
import { DatePipe } from '@angular/common';
const moment = _rollupMoment ;
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-attendance-employee',
  templateUrl: './attendance-employee.component.html',
  styleUrls: ['./attendance-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,

  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],

})
export class AttendanceEmployeeComponent implements OnInit {
  designations: any[] = [];
  today = new Date();
  addForm: FormGroup;
  rows: FormArray;
  employees: any[] = [];
  employeesList: any[] = [];
  departmentDrp: string = "";

  constructor(private api: ApiService,
    public fb: FormBuilder,
    private toastr: ToastrService,private datepipe: DatePipe,
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
      date: ['',Validators.required],
    });
  }
  onAddRow(data) {
    this.rows.push(this.createItemFormGroup(data));
  }
  createItemFormGroup(data): FormGroup {
    return this.fb.group({
      id: [data?.id],
      status: [data?.status],
      name: [data?.name],
      remark: [data?.remark],
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
  
  filterEmployee(addForm) {
    this.departmentDrp = addForm.value.designation;
    const postData ={
      designation : addForm.value.designation,
      date: this.datepipe.transform(addForm.value.date, 'MM/dd/yyyy')  
    };
    this.api.getEmployeeAttendance(postData).subscribe(resp => {
      this.employeesList = resp[0]?.data;
       if(!this.api.isEmptyObject(this.employeesList)) {
        var employeeobj: any;
        this.removeGroup();
        this.employeesList.forEach(element =>{
          employeeobj = {
            id: element?.id,
            status: element?.type,
            remark: '',
            name: element?.name,
          };
        this.onAddRow(employeeobj);
        })
      }
    },
      (err) => {
        this.removeGroup();
         console.error(err);
      })
   
  }
  statusChange(event) {
    this.rows.controls.forEach(element => {
      element.get('status').setValue(event.target.value);
    });
  }
  clearData(){
    this.removeGroup();
    this.filterEmployee(this.addForm);
  }
  saveEmployeeAttendance() {
    var emplList:any[] = []; 
    if(!this.api.isEmptyObject(this.addForm.value.rows)) {
      this.addForm.value.rows.forEach(element => {
          emplList.push({'employee': element?.id, "type": element?.status});
      });
    }
    const postData = {
      "designation":this.addForm.value.designation,
      "date":this.datepipe.transform(this.addForm.value.date, 'MM/dd/yyyy') ,
      "employee" : emplList
      }
      this.api.updateEmployeeAttendance(postData).subscribe(resp => {
        this.toastr.success(resp[0]?.msg, "Attendance Updated Successfully");
        this.clearData();
      },
        (err) => {
          this.toastr.error(err, " add failed");
          console.error(err);
        })
  }
}
