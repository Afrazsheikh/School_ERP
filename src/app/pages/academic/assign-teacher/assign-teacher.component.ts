import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { elementAt } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { StudentService } from '../../student-details/student.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-assign-teacher',
  templateUrl: './assign-teacher.component.html',
  styleUrls: ['./assign-teacher.component.scss']
})
export class AssignTeacherComponent {     
  isLoading: boolean;
  teacherForm: FormGroup
  sections: any[] = [];
  classes: any[] = [];
  employees: any[] = [];
  aceYear:any[] =[];
  teacherList:any[] = [];
  modalRef!: BsModalRef;
  teacherId:any;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder,
     private studentService:StudentService, private modalService: BsModalService,) {
    this.teacherForm = new FormGroup({
      academicYear: new FormControl(null, [Validators.required]),
      studentClass: new FormControl(null, [Validators.required]),
      section: new FormControl(null, [Validators.required])
    }); 
    this.aceYear = this.studentService.aceYear;
  }

  ngOnInit(): void {
    this.getAllClass();
    
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      this.classes = resp.classes
    });
  }
  findTeacher(formData){
    const payload = {
      "academicYear": formData.value.academicYear,
      "studentClass": formData.value.studentClass,
      "section": formData.value.section
    }
    this.api.getAllAcademicData(payload).subscribe(resp => {
      this.teacherList = resp.academics?.teachers;
    });
  }
  onChangeClass(event) {
    this.sections = [];
    this.teacherForm.patchValue({ section: 'select' });
    const id = event.target.value;
    this.classes.forEach(element => {
      if (element._id === id) {
        this.sections = element.sections;
      }
    });
  }
  assignTeacher(){
    this.router.navigate(['/academic/assign-teacher']);
  }
  editAssignTec(formData){

  }
  deleteAssignTec(template: TemplateRef<any>, data: any){
    this.teacherId = data._id;
    this.modalRef = this.modalService.show(template);
  }
  deletePopup(){
    const payload = {
      "academicYear": this.teacherForm.controls['academicYear'],
      "studentClass": this.teacherForm.controls['studentClass'],
      "section": this.teacherForm.controls['section'],
      "teacher": this.teacherId
    }
    this.api.removeAssignTechare(payload).subscribe(resp => {
      this.closePopup();
      this.toastr.success(resp.message, "Deleted success");
      this.findTeacher(this.teacherForm);
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
