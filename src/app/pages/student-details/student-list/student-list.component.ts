import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService} from '../student.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  sections: any[] = [];
  classes: any[] = [];
  subjects: any[] = [];
  reportForm: FormGroup;
  studentData: any;
  modalRef!: BsModalRef;
  studentId:any;
  studentSelRow:any;
  aceYear :any[] =[];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router, private modalService: BsModalService,
    private studentService:StudentService, private spinner: NgxSpinnerService
) {
   this.aceYear = this.studentService.aceYear;
   this.addForm();
  }
  ngOnInit(): void {  
    this.getAllClass();
    // this.getAllSection();
  
    
  }
  addForm() {
    this.reportForm = new FormGroup({
      studentClass: new FormControl(null, [Validators.required]),
      section: new FormControl(null),
      academicYear: new FormControl(null, [Validators.required])
    })
  }
  setClass(classId){
    this.sections =[];
    this.reportForm.patchValue({section: 'select'});
    const id = classId;
    this.classes.forEach(element => {
        if(element._id === id) {
          this.sections = element.sections;
        }
    });
  }
  onChangeClass(event){
    this.sections =[];
    const id = event.target.value;
    this.classes.forEach(element => {
        if(element._id === id) {
          this.sections = element.sections;
          this.reportForm.patchValue({section: element?.sections[0]?._id});
        }
    });
    console.log(event.target.value['section']);
  }
  getAllSection() {
    this.api.getAllSection().subscribe(resp => {
      this.sections = resp.sections;
      
    });
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      this.classes = resp.classes;
      if(this.studentService.studentDetailBackAction.isBack){
        this.setClass(this.studentService.studentDetailBackAction.studentClass);
        this.reportForm.patchValue({
          studentClass: this.studentService.studentDetailBackAction.studentClass ,
          section:this.studentService.studentDetailBackAction.section,
          academicYear:this.studentService.studentDetailBackAction.academicYear
        });
       
        this.reportForm.updateValueAndValidity();
        this.callReport(this.reportForm);
      }
    });
  }
  callReport(reportForm){
    const data = {
      academicYear: reportForm.value.academicYear,
      section: reportForm.value.section,
      studentClass: reportForm.value.studentClass,
    }
    this.spinner.show();
    this.api.studentList(data).subscribe(data => {
      this.spinner.hide();
      this.studentData = data['students'];
      this.studentService.studentDetailBackAction.isBack = false;
    },
    (err) =>{
      this.spinner.hide();
      this.studentData =[];
      this.toastr.error(err);
    })
  }
  openQuickModal(template: TemplateRef<any>, data: any){
    this.studentSelRow = data;
    this.modalRef = this.modalService.show(template);
  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.studentId = data._id;
    this.modalRef = this.modalService.show(template);
  }
  deletePopup(){
    this.api.deleteStudent(this.studentId).subscribe(resp => {
      this.closePopup();
      this.toastr.success(resp.message, "Deleted success");
      this.callReport(this.reportForm );
    },
    (err) => {
      this.toastr.error(err, " update failed");
      console.error(err);
    })
  }
  closePopup(){
    this.modalRef.hide();
  }
  editClick(student:any) {
    this.studentService.studentDetailBackAction.isBack = false;
    this.studentService.studentDetailBackAction.academicYear = this.reportForm.value.academicYear;
    this.studentService.studentDetailBackAction.section = this.reportForm.value.section;
    this.studentService.studentDetailBackAction.studentClass = this.reportForm.value.studentClass;
    this.router.navigate(['/student-details/student-view/', student._id]);
  }
}
