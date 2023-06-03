import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { elementAt } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { StudentService } from '../../student-details/student.service';

@Component({
  selector: 'app-assign-teacher',
  templateUrl: './assign-teacher.component.html',
  styleUrls: ['./assign-teacher.component.scss']
})
export class AssignTeacherComponent {
  isLoading: boolean;
  TeacherForm: FormGroup
  sections: any[] = [];
  classes: any[] = [];
  aceYear :any[] =[];
  teacherList:any;
  teacherId:any;
  modalRef!: BsModalRef;
  className:any;
  sectionName:any;
  constructor(private api: ApiService,private toastr: ToastrService, private router: Router, private modalService: BsModalService,
    private studentService:StudentService) {
      this.aceYear = this.studentService.aceYear;
      this.TeacherForm = new FormGroup({
        academicYear: new FormControl(null, [Validators.required]),
        studentClass: new FormControl(null, [Validators.required]),
        section: new FormControl(null, [Validators.required])
      });
  }

  ngOnInit(): void {
    this.getAllClass();

  }
  onChangeClass(event){
    this.sections =[];
    this.TeacherForm.patchValue({section: 'select'});
    const id = event.target.value;
    console.log(id);
    
    this.classes.forEach(element => {
        if(element._id === id) {
          this.sections = element.sections;
        }
    });
  }
  getAllSection() {
    this.api.getAllSection().subscribe(resp => {
      this.sections = resp.sections;
      
    });
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      this.classes = resp.classes;
      console.log(this.classes);
      
    });
  }
  callReport(reportForm){    
    this.teacherList = [];
    this.className = this.sectionName = '';
    const data = {
      academicYear: reportForm.value.academicYear,
      section: reportForm.value.section,
      studentClass: reportForm.value.studentClass,
    }
    this.api.getAllAcademicData(data).subscribe(data => {
      console.log(data);
      
      this.teacherList = data['academics']['teachers'];
      this.className = data['academics']['class'];
      this.sectionName = data['academics']['section'];
  //    this.studentService.studentDetailBackAction.isBack = false;
    },
    (err) =>{
    //  this.studentData =[];
      this.toastr.error(err);
    })
  }
  assignTeacher(){
    this.router.navigate(['/academic/assign-teacher']);
    
  }
  deleteAssignTec(template: TemplateRef<any>, data: any){
    this.teacherId = data._id;
    this.modalRef = this.modalService.show(template);
  }
  deletePopup(){
    /*this.api.deleteHomeWork(this.studentId).subscribe(resp => {
      this.closePopup();
      this.toastr.success(resp.message, "Deleted success");
      this.callReport(this.reportForm );
    },
    (err) => {
      this.toastr.error(err, " update failed");
      console.error(err);
    })*/
  }
  closePopup(){
    this.modalRef.hide();
  }
}
