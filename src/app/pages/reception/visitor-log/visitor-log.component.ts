import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-visitor-log',
  templateUrl: './visitor-log.component.html',
  styleUrls: ['./visitor-log.component.scss']
})
export class VisitorLogComponent {

  visitorLogForm: FormGroup
  isLoading: boolean;
  callLogs: any[]= []
  selectedEnq: any;
  editVisitor: FormGroup;
  selectedcall: any;
  
  constructor(private api: ApiService,private toastr: ToastrService  ) {
    this.visitorLogForm =  new FormGroup ({
      visitingPuprose: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      entryTime: new FormControl(null, [Validators.required]),
      exitTime: new FormControl(null, [Validators.required]),
      noOfVisitors: new FormControl(null, [Validators.required]),
      idNumber: new FormControl(null, [Validators.required]),
      token: new FormControl(null, [Validators.required]),

      note: new FormControl(null, [Validators.required]),
    


    
    });
    this.editVisitor =  new FormGroup ({
     
      visitingPuprose: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      entryTime: new FormControl(null, [Validators.required]),
      exitTime: new FormControl(null, [Validators.required]),
      noOfVisitors: new FormControl(null, [Validators.required]),
      idNumber: new FormControl(null, [Validators.required]),
      token: new FormControl(null, [Validators.required]),

      note: new FormControl(null, [Validators.required]),
    
    
    });
   


 

  }
  exam:any
  ngOnInit(): void {
    this.getVisitor() 
    // this.getMarksDiturbution() 
  }

  getVisitor(){
   
  
    this.api.getAllVisitor().subscribe(resp => {
      console.log(resp);
      
      this.callLogs = resp.callLogs
    });

}
  addVisitorLog()
  {
    // console.log(this.examTermForm.value);
    
    this.isLoading = true;
    this.api.addVisitorLog(this.visitorLogForm.value).subscribe(resp => {
      console.log(resp);
      
      this.isLoading = false;

      this.toastr.success(resp.message, "add success");
      this.getVisitor() 
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
    this.editVisitor.patchValue({
      visitingPuprose: enq.visitingPuprose,
   
      name: enq.name,
      mobileNo: enq.mobileNo,
      date: enq.date,
      entryTime: enq.entryTime,
      exitTime: enq.exitTime,
      noOfVisitors: enq.noOfVisitors,
      note: enq.note,
      idNumber: enq.idNumber,
      token: enq.token,


    

      
    
    });
  }

  updateVisitor(){

    this.isLoading = true;
    this.api.updateVisitor(this.selectedcall._id, this.editVisitor.value).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;

      document.getElementById('editModalDismissBtn')?.click();
      this.toastr.success(resp.message, "Call update success");
      this.getVisitor();
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
    this.api.deleteVisitor(this.selectedcall._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      document.getElementById('modalDismissBtn')?.click();
      this.getVisitor();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
  }

