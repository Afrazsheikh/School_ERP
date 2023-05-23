import { Component, TemplateRef } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeworkService } from '../homework.service';
import { StudentService } from '../../student-details/student.service';
@Component({
  selector: 'app-eval-report',
  templateUrl: './eval-report.component.html',
  styleUrls: ['./eval-report.component.scss']
})
export class EvalReportComponent {
  sections: any[] = [];
  classes: any[] = [];
  subjects: any[] = [];
  reportForm: FormGroup;
  reportData: any;
  modalRef!: BsModalRef;
  homeWorkId:any;
  aceYear :any[];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router, private modalService: BsModalService, 
    private homeworkService: HomeworkService,private studentService:StudentService) {
      this.aceYear = this.studentService.aceYear;
    this.getAllClass();
    this.getAllSection();
    this.addForm();
    this.getSubject();
  }
  addForm() {
    this.reportForm = new FormGroup({
      studentClass: new FormControl(null, [Validators.required]),
      section: new FormControl(null, [Validators.required]),
      academicYear: new FormControl(null, [Validators.required]),
      subject: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required])
    })
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
  callReport(reportForm){
    const data = {
      academicYear: reportForm.value.academicYear,
      section: reportForm.value.section,
      studentClass: reportForm.value.studentClass,
      subject:reportForm.value.subject,
      startDate:reportForm.value.startDate,
      endDate:reportForm.value.endDate,
    }
    this.api.getHomeWorkSubmissionList(data).subscribe(data => {
     this.reportData = data.homeworkSubmission;
    },
    (err) =>{
      this.reportData =[];
      this.toastr.error(err);
    })
  }
  editHomeWorkClick(row){
    this.homeworkService.editHomeWorkData = row;
    this.router.navigate(['/homework/list/edit/'+row._id]);
  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.homeWorkId = data._id;
    this.modalRef = this.modalService.show(template);
  }
  deletePopup(){
    this.api.deleteHomeWork(this.homeWorkId).subscribe(resp => {
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
}
