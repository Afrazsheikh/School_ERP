import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent {
subjectForm:  FormGroup
editSubject:  FormGroup

  isLoading: boolean;
  subjects: any[] = [];
  selectedDesign: any;
  constructor(private api: ApiService, private toastr: ToastrService,  private route: ActivatedRoute,private spinner: NgxSpinnerService) {
    this.subjectForm = new FormGroup({
      subjectName: new FormControl(null, [Validators.required]),
      subjectCode: new FormControl(null, [Validators.required]),
      subjectAuthor: new FormControl('', [Validators.required]),

      subjectType: new FormControl(null, [Validators.required])
  

    });
    this.editSubject = new FormGroup({
      
      subjectId: new FormControl(null, [Validators.required]),
      subjectName: new FormControl(null, [Validators.required]),

      subjectCode: new FormControl(null, [Validators.required]),
      subjectAuthor: new FormControl('', [Validators.required]),

      subjectType: new FormControl(null, [Validators.required])
  

    });
  }
  ngOnInit(): void {

    this.getSubject();
  }

  addSubject()
  {
    this.isLoading = true;
    this.api.addSubject( this.subjectForm.value).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;

      this.toastr.success(resp.message, "Subject add success");
      // this.designForm.reset();
      // this.getDesignations();
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, " add failed");
      console.error(err);
    })
  }
  getSubject(){
    this.spinner.show();
      this.api.getAllSubjects().subscribe(resp => {
        this.spinner.hide();        
        this.subjects = resp.subjects
      },
      (err)=>{
        this.spinner.hide();
      });

  }

  setSubject(dept: any)
  {

    console.log(dept);
    
    this.selectedDesign = dept;

    this.editSubject.patchValue({
      subjectId: dept._id,
      subjectName: dept.subjectName,
      subjectCode: dept.subjectCode,
      subjectAuthor: dept.subjectAuthor,
      subjectType: dept.subjectType,

   

    });

}

updateSubject(){
  this.isLoading = true;
  console.log(":this.editDistForm.value", this.editSubject.value);
  
  this.api.updateSubject(this.editSubject.value).subscribe(resp => {
    console.log(resp);
    
    this.isLoading = false;
    this.toastr.success(resp.message, "  update success");
    document.getElementById('editModalDismissBtn')?.click();
    this.getSubject();
  },
  (err) => {
    this.isLoading = false;
    this.toastr.error(err, "E update failed");
  })

}
deleteSubject(){
  this.isLoading = true;
  this.api.deleteSubject(this.selectedDesign._id).subscribe(resp => {
    console.log(resp);
    this.isLoading = false;
    document.getElementById('modalDismissBtn')?.click();
    this.getSubject()
  },
  (err) => {
    this.isLoading = false;
    console.error(err);
  })
}


}

