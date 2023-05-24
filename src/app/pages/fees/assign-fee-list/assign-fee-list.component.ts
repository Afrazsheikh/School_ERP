import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../student-details/student.service';

@Component({
  selector: 'app-assign-fee-list',
  templateUrl: './assign-fee-list.component.html',
  styleUrls: ['./assign-fee-list.component.scss']
})
export class AssignFeeListComponent {
  modalRef!: BsModalRef;
  categoryList:any[] =[];
  reportForm:any;
  aceYear :any[] =[];
  classes: any[] = [];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,private modalService: BsModalService, private studentService:StudentService){
    this.aceYear = this.studentService.aceYear;
  }
  ngOnInit(): void {    
    this.getAllClass();
    this.categoryList = [
      { "id":1, "name":"Acedemic Fee", "amount":"1000", "class":"Five"},
      { "id":2,"name":"Hostel Fee","amount":"1000", "class":"Five"},
      { "id":2,"name":"Tution Fee","amount":"1000", "class":"Five"},
      { "id":2,"name":"Field Trip Fee","amount":"1000", "class":"Five"},
      { "id":2,"name":"Admission Fee","amount":"1000", "class":"Five"},
      { "id":2,"name":"Transportation Fee for 5KM","amount":"1000", "class":"Five"},
      { "id":2,"name":"Transportation Fee for 10KM","amount":"1000", "class":"Five"},
      { "id":2,"name":"Transportation Fee for 15KM","amount":"1000", "class":"Five"},
      { "id":2,"name":"Transportation Fee for 20KM","amount":"1000", "class":"Five"},
      { "id":2,"name":"Transportation Fee for 25KM","amount":"1000", "class":"Five"},
      { "id":2,"name":"Transportation Fee for 30KM","amount":"1000", "class":"Five"}
      ];
      this.addForm();
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      this.classes = resp.classes;
    });
  }
  addForm() {
    this.reportForm = new FormGroup({
      studentClass: new FormControl(null, [Validators.required]),
      academicYear: new FormControl(null, [Validators.required])
    })
  }
  addFeeType(){
    this.router.navigate(['/fees/define-fee-type']);
  }
  addFeeType1(){
    this.router.navigate(['/fees/define-fee-type-1']);
  }
  addFeeType2(){
    this.router.navigate(['/fees/define-fee-type-2']);
  }
  callReport(data){
    
  }
}

