import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-principal-list-add',
  templateUrl: './principal-list-add.component.html',
  styleUrls: ['./principal-list-add.component.scss']
})
export class PrincipalListAddComponent {
  studentForm:any;
  constructor(private api: ApiService, private toastr: ToastrService, 
    private router: Router,public fb: FormBuilder,private datepipe: DatePipe) {

  }
  ngOnInit() {
    this.createForm();
  }  
  createForm() {
    this.studentForm = this.fb.group({
      date: ['', Validators.required],
      presentStudent: ['', Validators.required],
      presentTeacher: ['', Validators.required],
      noOfRound: ['', Validators.required],
      observedByPrincipal: ['', Validators.required],
      participateCompetetion: ['', Validators.required],
      wonCompetetion: ['', Validators.required],
      event: [''],
    });
  }
  createInfo(data){
    console.log(data.value);
    const postData = {
      date : this.datepipe.transform(data.value.date,'MM/dd/yyyy'),
      teacherPresent: data.value.presentTeacher,
      studentPresent: data.value.presentStudent,
      roundTaken: data.value.noOfRound,
      observedByPrincipal: data.value.observedByPrincipal,
      participated: data.value.participateCompetetion,
      wonCompetition: data.value.wonCompetetion,
      evenetConduct:data.value.event
    }
    this.api.createPrincipalReport(postData).subscribe(resp => {
      this.toastr.success(resp?.msg, "Saved Successfully");
      this.router.navigate(['/report/prinicipal-report']);
    },
      (err) => {
        this.toastr.error(err, " Save failed");
        console.error(err);
      })
  }    
}
