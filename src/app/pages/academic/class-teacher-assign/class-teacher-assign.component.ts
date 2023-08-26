import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../student-details/student.service';
import { ApiService} from '../../../services/api.service';
@Component({
  selector: 'app-class-teacher-assign',
  templateUrl: './class-teacher-assign.component.html',
  styleUrls: ['./class-teacher-assign.component.scss']
})
export class ClassTeacherAssignComponent {
  sections: any[] = [];
  classes: any[] = [];
  aceYear: any[] = [];
  teacher: any[] = [];
  employees: any[] = [];
  teacherForm:any;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder,
     private studentService:StudentService) {
      this.aceYear = this.studentService.aceYear;
  }
  ngOnInit() {
    this.getAllClass();
    this.getEmployees();
    this.createForm();
  }
  getEmployees()
  {
    this.api.getTeacherList().subscribe(resp => {
      this.teacher = resp.teachers;       
    });
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      this.classes = resp.classes
    });
  }
  onChangeClass(event) {
    this.sections = [];
   // this.teacherForm.patchValue({ section: 'select' });
    const id = event.target.value;
    this.classes.forEach(element => {
      if (element._id === id) {
        this.sections = element.sections;
        this.teacherForm.patchValue({section: element?.sections[0]?._id});
      }
    });
  }
  createForm() {
    this.teacherForm = this.fb.group({
      id: [''],
      academicYear: ['', Validators.required],
      studentClass: ['', Validators.required],
      section: ['', Validators.required],
      assignTeacher: ['', Validators.required],
    });
  }
  createInfo(formData){
    const  payload = {
      academicYear: formData.value.academicYear , 
      studentClass: formData.value.studentClass, 
      section:formData.value.section, 
      teachers: [formData.value.assignTeacher]
    }
      this.api.addTeacher(payload).subscribe(resp => {
        this.toastr.success(resp.message, "Teache assign successfully");
        this.router.navigate(['/academic/assign']);
      },
        (err) => {
          this.toastr.error(err, "Assign Failed");
          console.error(err);
        });
  }
}
