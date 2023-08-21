import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admission-enq',
  templateUrl: './admission-enq.component.html',
  styleUrls: ['./admission-enq.component.scss']
})
export class AdmissionEnqComponent {


  addEnquiryForm: FormGroup
  isLoading: boolean;
  enquiries: any[]= []
  selectedEnq: any;
  editEnq: FormGroup;
  
  constructor(private api: ApiService,private toastr: ToastrService  ) {
    this.addEnquiryForm =  new FormGroup ({
      name: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      dob: new FormControl(null, [Validators.required]),
      fatherName: new FormControl(null, [Validators.required]),
      motherName: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      assigned: new FormControl(null, [Validators.required]),
      response: new FormControl(null, [Validators.required]),
      classApplyFor: new FormControl(null, [Validators.required]),


    
    });
    this.editEnq =  new FormGroup ({
     
      // examTermId: new FormControl(null, [Validators.required]),

      name: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      dob: new FormControl(null, [Validators.required]),
      fatherName: new FormControl(null, [Validators.required]),
      motherName: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      assigned: new FormControl(null, [Validators.required]),
      response: new FormControl(null, [Validators.required]),
      classApplyFor: new FormControl(null, [Validators.required]),

    
    });
   


 

  }
  exam:any
  ngOnInit(): void {
    this.getEnqu() 
    // this.getMarksDiturbution() 
  }

  getEnqu(){
   
  
    this.api.getEnquery().subscribe(resp => {
      console.log(resp);
      
      this.enquiries = resp.enquiries
    });

}
  addDEnquery()
  {
    // console.log(this.examTermForm.value);
    this.addEnquiryForm.value.mobileNo = this.addEnquiryForm.value.mobileNo.toString();
    this.addEnquiryForm.value.classApplyFor = this.addEnquiryForm.value.classApplyFor.toString();
    this.isLoading = true;
    this.api.addEnquery(this.addEnquiryForm.value).subscribe(resp => {
      console.log(resp);      
      this.isLoading = false;
      this.toastr.success(resp.message, "add success");
      this.getEnqu();     
  // this.getExamTerms();
    },
    (err) => {
      this.isLoading = false; 
      this.toastr.error(err, " add failed");
      console.error(err);
    })
  }

  setEnq(enq: any)
  {
    this.selectedEnq = enq;
    this.editEnq.patchValue({name: enq.name,
    
      gender: enq.gender,
      dob: enq.dob,
      fatherName: enq.fatherName,
      motherName: enq.motherName,
      mobileNo: enq.mobileNo,
      email: enq.email,
      assigned: enq.assigned,
      response: enq.assigned,
      classApplyFor: enq.classApplyFor,

      
    
    });
  }

  updateEnq(){

    this.isLoading = true;
    this.editEnq.value.mobileNo = this.editEnq.value.mobileNo.toString();
    this.editEnq.value.classApplyFor = this.editEnq.value.classApplyFor.toString();

    this.api.updateEnq(this.selectedEnq._id, this.editEnq.value).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;

      document.getElementById('editModalDismissBtn')?.click();
      this.toastr.success(resp.message, "enquiry update success");
      this.getEnqu();
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Enquiry update failed");
      console.error(err);
    })

  }

  delete(){
    this.isLoading = true;
    this.api.deleteenquiry(this.selectedEnq._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      document.getElementById('modalDismissBtn')?.click();
      this.getEnqu();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
  }

