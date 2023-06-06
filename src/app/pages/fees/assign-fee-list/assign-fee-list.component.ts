import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../student-details/student.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-assign-fee-list',
  templateUrl: './assign-fee-list.component.html',
  styleUrls: ['./assign-fee-list.component.scss']
})
export class AssignFeeListComponent {
  modalRef!: BsModalRef;
  categoryList:any[] =[];
  feeListClassWise:any[] = [];
  feeListClassWiseRow:any[] =[];
  reportForm:any;
  aceYear :any[] =[];
  classes: any[] = [];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,private modalService: BsModalService, private studentService:StudentService){
    this.aceYear = this.studentService.aceYear;
  }
  ngOnInit(): void {    
     this.addForm();
     this.getFeeCategory();
  }
  getFeeCategory(){
    this.api.getAllFeeCategory().subscribe(data =>{
      this.categoryList = data.allData
    }, (err) => {
      this.categoryList = [];
       console.error(err);
     });
  };
  getFeeData(data){
    const payload = {
      year: data.academicYear
    }
    this.feeListClassWise = [];
    this.feeListClassWiseRow= []; 
    this.api.getFeeTypeYearwise(payload).subscribe(data =>{
      this.feeListClassWiseRow = data['data'];
      this.feeListClassWiseRow.forEach(element =>{
        const rowData ={ "class": element.class, "year": element.year, "totalAmount":0}
         this.categoryList.forEach(cate =>{
          var userName = element.feeCategory.find(x => x.categoryName === cate.categoryName);
          if(userName !== undefined){
            rowData['totalAmount'] =  rowData['totalAmount'] + Number(userName.amount);
            rowData[cate.categoryName] =userName.amount
          } else {
            rowData[cate.categoryName] = 0;
          }
         });
         this.feeListClassWise.push(rowData);
      })
      console.log(this.feeListClassWise);
     },
     (err) => {
      this.feeListClassWise = [];
       console.error(err);
     });
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      this.classes = resp.classes;
    });
  }
  addForm() {
    this.reportForm = new FormGroup({
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
    this.feeListClassWise = [];
    this.feeListClassWiseRow= [];    
    this.getFeeData(data.value);
  }
}

