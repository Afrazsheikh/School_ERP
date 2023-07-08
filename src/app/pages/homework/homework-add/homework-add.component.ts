import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../student-details/student.service';
@Component({
  selector: 'app-homework-add',
  templateUrl: './homework-add.component.html',
  styleUrls: ['./homework-add.component.scss']
})
export class HomeworkAddComponent {
  sections: any[] = [];
  classes: any[] = [];
  subjects: any[] = [];
  homeWorkForm: FormGroup;
  aceYear:any[] = [];
  constructor( public fb: FormBuilder,public router: Router, private api: ApiService,private toastr: ToastrService,private studentService:StudentService) {
    this.aceYear = this.studentService.aceYear;
  }
  ngOnInit() {
    this.createForm();
    this.getAllClass();
   // this.getAllSection();
    this.getSubject();
  }
  createForm(){
    this.homeWorkForm = this.fb.group({
      studentClass: ['', Validators.required],
      section: ['', Validators.required],
      subject: ['', Validators.required],
      academicYear: ['', Validators.required],
      homeWorkDate:['', Validators.required],
      submissionDate:['', Validators.required],
      scheduleDate:['', Validators.required],
      attachement:[''],
      description:['',Validators.required],
      smsNotification:[false]
    });
  }
  onChangeClass(event){
    this.sections =[];
    const id = event.target.value;
    this.classes.forEach(element => {
        if(element._id === id) {
          this.sections = element.sections;
          this.homeWorkForm.patchValue({section: element?.sections[0]?._id});
        }
    });
    console.log(event.target.value['section']);
  }
  getAllSection() {
    this.api.getAllSection().subscribe(resp => {
      this.sections = resp.sections
    });
  }
  getSubject() {
    this.api.getAllSubjects().subscribe(resp => {
      this.subjects = resp.subjects
    });
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      this.classes = resp.classes
    });
  }
  submitDate(formData:any){
    console.log(formData);
    const payload ={
      academicYear : formData.value.academicYear,
      studentClass: formData.value.studentClass, 
      section: formData.value.section, 
      subject:formData.value.subject,  
      dateOfHomework:formData.value.homeWorkDate,
      dateOfSubmission: formData.value.submissionDate, 
      scheduleDate:formData.value.scheduleDate,
      description:formData.value.description,
      smsNotification:formData.value.smsNotification,
      file:formData.value.attachement
    }
    this.api.addHomeWork(payload).subscribe(resp => {
      this.toastr.success(resp.message, "Added success");
      this.router.navigate(['/homework/list']);
    },
    (err) => {
      this.toastr.error(err, " add failed");
      console.error(err);
    })
  }
}