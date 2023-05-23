import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

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
  aceYear = [{ _id: "2020-2021", name: "2020-2021" }, { _id: "2021-2022", name: "2021-2022" }, { _id: "2022-2023", name: "2022-2023" }];
  acdamic: any;
  academic: any[]=[];
  academicID: any;


  constructor(private api: ApiService, private toastr: ToastrService, private router: Router)
  {
   
    this.classAssignForm = new FormGroup({
      // vehicleId: new FormControl("select", [Validators.required]),
      academicYear: new FormControl(null, [Validators.required]),
      studentClass: new FormControl(null, [Validators.required]),
      section: new FormControl(null, [Validators.required]),
      subjects: new FormControl(null, [Validators.required]),

    });
  }
  ngOnInit(): void {
  
    
    this.getAllSection();
    this.getAllClass();
    this.getSubject();
    this.getAllStudent()
    this.getAllAcademics()
  

  }

  onChangeYear(event){
   
    console.log(event.target.value)
    this.academicID  = event.target.value
   
  }


  onChangeClass(event){
    this.sections =[];
    this.classAssignForm.patchValue({section: 'select'});
    const id = event.target.value;
    this.classes.forEach(element => {
        if(element._id === id) {
          this.sections = element.sections;
        }
    });
  }

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

mapAcademicYear()
{
  console.log(",-----------");

  this.students.forEach(stud => {
console.log(stud);

    
stud["academicYear"] = this.academics.find(d => d._id == stud.academic);
console.log(stud.academic._id);

 
    
  });

  
}



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
    this.mapAcademicYear()

  });

}
  AssignClassTeacher(){
    console.log(this.classAssignForm.value);
    
   
   
    // console.log(postData);
    this.api.AssignSubject(this.classAssignForm.value ).subscribe(resp => {
    console.log(resp);
  
      this.isLoading = false;
      this.toastr.success(resp.message, "Add  success");
   
  
     
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, " add failed");
    })
  }
  

}
 