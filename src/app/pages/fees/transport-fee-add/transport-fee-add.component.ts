import { Component, TemplateRef } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../student-details/student.service';
import { FeeService } from '../fee.service';

@Component({
  selector: 'app-transport-fee-add',
  templateUrl: './transport-fee-add.component.html',
  styleUrls: ['./transport-fee-add.component.scss']
})
export class TransportFeeAddComponent {
  modalRef!: BsModalRef;
  transportList:any[] =[];
  reportForm:any;
  aceYear :any[] =[];
  transportationId :any;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,private modalService: BsModalService, 
    private studentService:StudentService,private feeService:FeeService){
    this.aceYear = this.studentService.aceYear;
  }
  ngOnInit(): void {
      this.addForm();
      this.getAllData();
  }
  addForm() {
    this.reportForm = new FormGroup({
      id: new FormControl(null),
      academicYear: new FormControl(null, [Validators.required]),
      distance: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required])
    })
  }
  getAllData(){
    this.api.getAllTransportationList().subscribe(data =>{
      this.transportList = data.transportFee;
     },
     (err) => {
      this.transportList = [];
       console.error(err);
     });
  }
  submitData(formData){
    const payload ={
      year: formData.value.academicYear,
      distance: (formData.value.distance).toString(), 
      amount : (formData.value.amount).toString(), 
    }
    console.log(formData.value);
    if(formData.value.id !== '' && formData.value.id !== null && formData.value.id !== undefined){
      this.api.updateTransportFee(formData.value.id,payload).subscribe(resp => {
        this.toastr.success(resp.message, "Updated Successfully");
        this.reportForm.reset();
        this.getAllData();
      },
      (err) => {
        this.toastr.error(err, " update failed");
        this.reportForm.reset();
        console.error(err);
      })
    } else {
      this.api.createTransportFee(payload).subscribe(resp => {
        this.toastr.success(resp.message, "Added success");
        this.reportForm.reset();
        this.getAllData();
      },
      (err) => {
        this.toastr.error(err, " add failed");
        this.reportForm.reset();
        console.error(err);
      })
    }
   
  }
  backButtonClick(){
    this.router.navigate(['fees/transport-fee-list']);
  }
  editCategory(rowData){
    this.reportForm.patchValue({
      id: rowData._id,
      academicYear: rowData?.year,
      distance: rowData?.distance,
      amount: rowData?.amount
    });
  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.transportationId = data._id;
    this.modalRef = this.modalService.show(template);
  }
  deletePopup(){
    this.api.deleteTransportFee(this.transportationId).subscribe(resp => {
      this.closePopup();
      this.toastr.success(resp.message, "Deleted success");
      this.getAllData();
    },
    (err) => {
      this.toastr.error(err, " update failed");
      console.error(err);
    })
  }
  closePopup(){
    this.modalRef.hide();
  }
}


