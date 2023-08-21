import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-call-log',
  templateUrl: './call-log.component.html',
  styleUrls: ['./call-log.component.scss']
})
export class CallLogComponent {

  callLogForm: FormGroup
  isLoading: boolean;
  callLogs: any[]= []
  selectedEnq: any;
  editCall: FormGroup;
  selectedcall: any;
  
  constructor(private api: ApiService,private toastr: ToastrService  ) {
    this.callLogForm =  new FormGroup ({
      callType: new FormControl(null, [Validators.required]),
      purpose: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      timeSlotTo: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      timeSlotFrom: new FormControl(null, [Validators.required]),
      followUpDate: new FormControl(null, [Validators.required]),
      note: new FormControl(null, [Validators.required]),
    


    
    });
    this.editCall =  new FormGroup ({
     
      // examTermId: new FormControl(null, [Validators.required]),
      callType: new FormControl(null, [Validators.required]),
      purpose: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      timeSlotTo: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      timeSlotFrom: new FormControl(null, [Validators.required]),
      followUpDate: new FormControl(null, [Validators.required]),
      note: new FormControl(null, [Validators.required]),
    
    
    });
   


 

  }
  exam:any
  ngOnInit(): void {
    this.getCallLog() 
    // this.getMarksDiturbution() 
  }

  getCallLog(){
   
  
    this.api.getAllCallLogs().subscribe(resp => {
      console.log(resp);
      
      this.callLogs = resp.callLogs
    });

}
  addCallLog()
  {
    // console.log(this.examTermForm.value);
    
    this.isLoading = true;
    this.api.addCallLog(this.callLogForm.value).subscribe(resp => {
      console.log(resp);
      
      this.isLoading = false;

      this.toastr.success(resp.message, "add success");
      this.getCallLog() ;
  // this.getExamTerms();
    },
    (err) => {
      this.isLoading = false; 
      this.toastr.error(err, " add failed");
      console.error(err);
    })
  }

  setCall(enq: any)
  {
    this.selectedcall = enq;
    this.editCall.patchValue({
      callType: enq.callType,
      purpose: enq.purpose,
      name: enq.name,
      mobileNo: enq.mobileNo,
      date: enq.date,
      timeSlotTo: enq.timeSlotTo,
      timeSlotFrom: enq.timeSlotFrom,
      followUpDate: enq.followUpDate,
      note: enq.note,
    

      
    
    });
  }

  updateEnq(){

    this.isLoading = true;
    this.api.updateCall(this.selectedcall._id, this.editCall.value).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;

      document.getElementById('editModalDismissBtn')?.click();
      this.toastr.success(resp.message, "Call update success");
      this.getCallLog();
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Call update failed");
      console.error(err);
    })

  }

  delete(){
    this.isLoading = true;
    this.api.deletCall(this.selectedcall._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      document.getElementById('modalDismissBtn')?.click();
      this.getCallLog();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
  }

