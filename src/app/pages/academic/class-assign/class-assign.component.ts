import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService } from '../../student-details/student.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-class-assign',
  templateUrl: './class-assign.component.html',
  styleUrls: ['./class-assign.component.scss']
})
export class ClassAssignComponent {
classAssignForm: FormGroup
  isLoading: boolean;
  classes: any[] = [];
  sections: any[] = [];
  subjects: any[] = [];
  students: any[]=[]
  academics:  any=[]
  subjectList :any
  aceYear: any[] = [];
  // aceYear = [{ _id: "2020-2021", name: "2020-2021" }, { _id: "2021-2022", name: "2021-2022" }, { _id: "2022-2023", name: "2022-2023" }];
  acdamic: any;
  academic: any[]=[];
  academicID: any;
  selectedID: any;
  className: any;
  sectionName: any;
  subjectArray: any[];


  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,
     private studentService:StudentService,private spinner: NgxSpinnerService)
  {
    this.aceYear = this.studentService.aceYear;
  
  }
  ngOnInit(): void {
  
    this.createForm()
    // this.getAllSection();
    this.getAllClass();
    this.getSubject();
    this.getAllStudent()
    this.getAllAcademics()
  

  }
  createForm(){
    this.classAssignForm = new FormGroup({
      // vehicleId: new FormControl("select", [Validators.required]),
      academicYear: new FormControl(null, [Validators.required]),
      studentClass: new FormControl(null, [Validators.required]),
      section: new FormControl(null, [Validators.required]),
      subjects: new FormControl(null, [Validators.required]),

    });
  }

  onChangeClass(event) {
    this.sections = [];
    this.classAssignForm.patchValue({ section: 'select' });
    const id = event.target.value;
    this.classes.forEach(element => {
      if (element._id === id) {
        this.sections = element.sections;
        this.classAssignForm.controls['section'].patchValue(this.sections[0]._id);
      }
    });
  }

  onChangeYear(event){
   
    console.log(event.target.value)
    this.academicID  = event.target.value
   
  }


  // onChangeClass(event){
  //   this.sections =[];
  //   this.classAssignForm.patchValue({section: 'select'});
  //   const id = event.target.value;
  //   this.classes.forEach(element => {
  //       if(element._id === id) {
  //         this.sections = element.sections;
  //       }
  //   });
  // }

  getSubject(){

    this.api.getAllSubjects().subscribe(resp => {
      console.log(resp);
      
      this.subjects = resp.subjects
    });

}

  getAllSection(){
   
  
    this.api.getAllSection().subscribe(resp => {
      console.log(resp);
      
      this.sections = resp.sections
    });

}


  getAllClass(){
   
  
    this.api.getAllClass().subscribe(resp => {
      console.log(resp);
      
      this.classes = resp.classes

    });

}

// mapAcademicYear()
// {
//   console.log(",-----------");

//   this.students.forEach(stud => {
// console.log(stud);

    
// stud["academicYear"] = this.academics.find(d => d._id == stud.academic);
// console.log(stud.academic._id);

 
    
//   });

  
// }



getAllAcademics(){
   
  
  this.api.getAllAcademic().subscribe(resp => {

    
    this.academics = resp.academics
    console.log(this.academics);
    
//  this.mapAcademicYear()

  });

}
getAllStudent(){
  this.api.getAllStudent().subscribe(resp => {
    console.log(resp); 
    this.students = resp.students
  });

}
  AssignClassTeacher(){
   const payload ={
      academicYear: this.classAssignForm.value?.academicYear,
      studentClass: this.classAssignForm.value?.studentClass?._id,
      section: this.classAssignForm.value?.studentClass?.sections[0]?._id,
      subjects:  this.classAssignForm.value?.subjects
    }   
    this.api.AssignSubject(payload).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, "Added  Successfully");
      this.classAssignForm.reset();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, " Add  Failed");
    })
  }

 
  

  callReport(reportForm){
    this.spinner.show();
    
    this.subjectList = [];
    const data = {
      academicYear: reportForm.value.academicYear,
      section: reportForm.value.section,
      studentClass: reportForm.value.studentClass,
    }
    this.api.getAllAcademicData(data).subscribe(data => {
      this.spinner.hide();
      
      this.subjectList = data['academics']['subjects'];
      // Convert subjectList object to an array
// this.subjectArray = Object.values(this.subjectList);

      this.className = data['academics']['class'];
      this.sectionName = data['academics']['section'];
      console.log(this.subjectList);
      

    },
    (err) =>{
      this.spinner.hide();
      this.toastr.error(err);
    })
  }
  
  
  delete(){
    console.log(this.selectedID)
   
    this.isLoading = true;
    const payload = {
      academicYear: this.classAssignForm.value.academicYear,
      studentClass: this.classAssignForm.value.studentClass, 
      section : this.classAssignForm.value.section, 
      subject: this.selectedID?._id
    }
    this.api.deleteClassNewApi(payload).subscribe(resp => {
      this.isLoading = false;
       this.toastr.success(resp[0]['msg'], " Deleted successFully");
      document.getElementById('modalDismissBtn')?.click();
    // this.closeButton.nativeElement?.click();
      this.getAllClass()
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
}
 