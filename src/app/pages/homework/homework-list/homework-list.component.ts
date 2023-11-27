import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeworkService } from '../homework.service';
import { StudentService } from '../../student-details/student.service';

@Component({
  selector: 'app-homework-list',
  templateUrl: './homework-list.component.html',
  styleUrls: ['./homework-list.component.scss']
})
export class HomeworkListComponent {
  sections: any[] = [];
  classes: any[] = [];
  subjects: any[] = [];
  reportForm: FormGroup;
  reportData: any;
  modalRef!: BsModalRef;
  homeWorkId:any;
  aceYear: any [];
  selectedRow:any;
  tableHeader:any;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router, private modalService: BsModalService, 
    private homeworkService: HomeworkService,private studentService:StudentService ) {
      this.aceYear = this.studentService.aceYear;
    this.getAllClass();
    this.addForm();
    this.getSubject();
  }
  ngOnInit(): void {  

    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "subjectName", dataType: "string", title: 'Subject', sort: true, visible: true, search:true },
        {  field: "class", dataType: "string", title: 'Class', sort: true, visible: true, search:true },
        {  field: "section", dataType: "string", title: 'Section', sort: true, visible: true, search:true },
        {  field: "dateOfHomework", dataType: "date", title: 'Date of Homework', sort: true, visible: true, search:true },
        {  field: "dateOfSubmission", dataType: "date", title: 'Date of Submission', sort: true, visible: true, search:true },
        {  field: "scheduleDate", dataType: "date", title: 'Scheduled At', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
       ],
      searchPlaceholder:"Search by Subject, Class, Section",
      sortBy: { field: 'subjectName', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {
         
          edit: {
            show: true,
            callback: () => {
              
            },
          },
          delete: {
            show: true,
            callback: () => {
              // $('#detail-grievance').modal('show')
  
            },
          },
        },
      },
    }
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
      startDate:reportForm.value.startDate,
      endDate:reportForm.value.endDate,
      subject:reportForm.value.subject
    }
    this.api.getHomeWorkList(data).subscribe(data => {
     this.reportData = data.homework;
     this.reportData.forEach(element => {
        if(element?.subject){
          element['subjectName'] = element?.subject?.subjectName
        }
     });
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
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'edit'){
    this.editHomeWorkClick(this.selectedRow)
    }
    if($event['event'] === 'delete'){
      this.openDeleteModal(this.deleteTemplate, this.selectedRow)
    }

  }
}
