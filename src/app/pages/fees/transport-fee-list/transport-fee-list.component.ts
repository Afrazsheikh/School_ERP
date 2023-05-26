import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../student-details/student.service';

@Component({
  selector: 'app-transport-fee-list',
  templateUrl: './transport-fee-list.component.html',
  styleUrls: ['./transport-fee-list.component.scss']
})
export class TransportFeeListComponent {
  modalRef!: BsModalRef;
  transportList:any[] =[];
  reportForm:any;
  aceYear :any[] =[];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,private modalService: BsModalService, private studentService:StudentService){
    this.aceYear = this.studentService.aceYear;
  }
  ngOnInit(): void {
      this.addForm();
  }
  addForm() {
    this.reportForm = new FormGroup({
      academicYear: new FormControl(null, [Validators.required])
    })
  }
  addFeeType(){
    this.router.navigate(['/fees/transport-fee-add']);
  }
  callReport(data){
    this.transportList = [
      { "id":"Transport 5KM", "distance":"5 KM", "amount":"500"},
      { "id":"Transport 10KM","distance":"10 KM","amount":"1000"},
      { "id":"Transport 15KM","distance":"15 KM","amount":"1500"},
      { "id":"Transport 20KM","distance":"20 KM","amount":"2000"},
      { "id":"Transport 25KM","distance":"25 KM","amount":"2500"},
      ];
  }
}

