import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../student-details/student.service';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss']
})
export class ClassScheduleComponent {
  scheduleArr = [];
  displayScheArr :string[][] = [];
  aceYear :any[]= [];
  sections: any[] = [];
  classes: any[] = [];
  addForm:FormGroup;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder,private studentService:StudentService) {
   this.aceYear = this.studentService.aceYear;
  }
  ngOnInit() {
    this.createForm();
    this.getAllClass();
  }
  createForm(){
    this.addForm = this.fb.group({
      class: ['',Validators.required],
      section: ['',Validators.required],
      year:['', Validators.required]
    });
  }
  onChangeClass(event){
    this.sections =[];
    this.addForm.patchValue({section: 'select'});
    const id = event.target.value;
    this.classes.forEach(element => {
        if(element._id === id) {
          this.sections = element.sections;
          this.addForm.controls['section'].patchValue(this.sections[0]?._id);
        }
    });
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      console.log(resp);
      this.classes = resp.classes
    });
  }
  clickFilter(form:any){
    const s_year = form.value.year;
    const s_class = form.value.class;
    const s_section = form.value.section;
    this.getAllSchedule(s_year,s_class,s_section);
  }
  getAllSchedule(s_year, s_class, s_section){
    const payload ={
      academicYear:s_year,
      studentClass:s_class, 
      section:s_section
    }
    this.api.getClassAllSchedule(payload).subscribe(resp => {
     this.scheduleArr = resp.schedule;
    });
  }
  
}
