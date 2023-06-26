import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-principal-list-add',
  templateUrl: './principal-list-add.component.html',
  styleUrls: ['./principal-list-add.component.scss']
})
export class PrincipalListAddComponent {
  studentForm:any;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder) {

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
    
  }    
}
