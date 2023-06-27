import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentService } from '../../student-details/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-principal-list',
  templateUrl: './principal-list.component.html',
  styleUrls: ['./principal-list.component.scss']
})
export class PrincipalListComponent {
  reportForm: any;
  aceYear :any[] =[];
  principalData:any = {};
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,
    private studentService:StudentService, private spinner: NgxSpinnerService, private datepipe: DatePipe
) {
   this.aceYear = this.studentService.aceYear;
   this.clearPrincipalData();
   this.addForm();
  }
  clearPrincipalData(){
    this.principalData = {
      "_id":"",
      "date":"",
      "day":"",
      "teacherPresent":"",
      "studentPresent":"",
      "roundTaken":"",
      "observedByPrincipal":"",
      "participated":"",
      "wonCompetition":"",
      "evenetConduct":""
    };
  }
  addForm() {
    this.reportForm = new FormGroup({
        startDate:new FormControl(null, [Validators.required]),
    })
  }
  callReport(formData){
    const postData ={
      date: this.datepipe.transform(formData.value.startDate, 'MM/dd/yyyy')  
    };
    this.spinner.show();
    this.clearPrincipalData();
    this.api.getPrincipalReport(postData).subscribe(resp => {
      this.spinner.hide();
     this.principalData = resp?.report;
     console.log( this.principalData);
    },
      (err) => {
        this.spinner.hide();
         console.error(err);
      })  
  }
  addReportData(){
    this.router.navigate(['/report/add-school-data']);
  }
}
