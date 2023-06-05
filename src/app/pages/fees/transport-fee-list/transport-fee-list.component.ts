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
  totalAmount =0;
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
    const payload = {
      year: data.value.academicYear
    }
    this.api.getYearWiseTransportationList(payload).subscribe(data =>{
      this.transportList = data.allData;
       if(!this.api.isEmptyObject(this.transportList)){
        this.transportList.forEach(element =>{
          this.totalAmount = this.totalAmount + Number(element?.amount);
        });
        console.log(this.totalAmount);
       }
     },
     (err) => {
      this.transportList = [];
      // this.toastr.error(err, " add failed");
       console.error(err);
     });
  }
}


