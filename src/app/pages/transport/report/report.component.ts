import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService } from '../../student-details/student.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  sections: any[] = [];
  classes: any[] = [];
  reportForm: FormGroup;
  modalRef!: BsModalRef;
  reportData: any[];
  deleteRecId : any;
  aceYear: any[];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,private modalService: BsModalService,private studentService:StudentService) {
    this.aceYear = this.studentService.aceYear;
    this.getAllClass();
    this.getAllSection();
    this.addForm();
  }
  addForm() {
    this.reportForm = new FormGroup({
      studentClass: new FormControl(null, [Validators.required]),
      section: new FormControl(null, [Validators.required]),
      academicYear: new FormControl(null, [Validators.required])
    })
  }
  getAllSection() {
    this.api.getAllSection().subscribe(resp => {
      console.log(resp);
      this.sections = resp.sections
    });
  }

  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      console.log(resp);
      this.classes = resp.classes
    });

  }
  callReport(reportForm: any) {
    console.log(reportForm)
    const data = {
      academicYear: reportForm.value.academicYear,
      section: reportForm.value.section,
      studentClass: reportForm.value.studentClass,
    }
    this.api.allocationReportSearch(data).subscribe(data => {
      this.reportData = data.students;
    },
    (err) =>{
      this.reportData =[];
      this.toastr.error(err);
    })
  }
  
  openDeleteModal(template: TemplateRef<any>, item){
    this.deleteRecId = item._id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered'
    });
  }
  deleteConfirm(deleteRecId) {
   const payload = {
    studentId: deleteRecId
   }
     this.api.deleteTransportationRecord(payload).subscribe(res => {
      this.closePopup();
      this.toastr.success(res[0].msg, "Deleted success");
      this.callReport(this.reportForm);
      
    }, err => {
      this.closePopup();
      this.toastr.error(err, " update failed");
      console.error("catch", err);
     });
  }  
  closePopup(){
    this.modalRef.hide();
  }
}
