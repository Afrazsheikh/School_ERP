import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { StudentService } from '../../student-details/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { numbers } from '@material/toolbar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-student-promotion',
  templateUrl: './student-promotion.component.html',
  styleUrls: ['./student-promotion.component.scss']
})
export class StudentPromotionComponent implements OnInit {
  filterForm: FormGroup;
  promotionForm: FormGroup;
  modalRef!: BsModalRef;
  classes: any[] = [];
  sections: any[] = [];
  aceYear: any[] = [];
  studentData: any;
  visiblePromotion: boolean = false;
  selectChkCount: number = 0;
  @ViewChild('AllChkPromotion') private allChkPromotion: any;
  config = {
    displayKey: "name",
    height: "250px",
    search: true,
    placeholder: "Select",
    searchPlaceholder: "Search...",
    limitTo: 0,
    customComparator: undefined,
    noResultsFound: "No results found!",
    moreText: "more",
    searchOnKey: "name",
    clearOnSelection: false,
    inputDirection: "ltr",
    selectAllLabel: "Select all",
    enableSelectAll: false
  }
  options: any[] = [];
  studentList: any[] = [];
  promteStudentEnable: boolean = false;
  notPromteStudentList: any[] = [];
  constructor(private api: ApiService, private toastr: ToastrService, private modalService: BsModalService,
    private studentService: StudentService, private spinner: NgxSpinnerService, private cd: ChangeDetectorRef) {
    this.aceYear = this.studentService.aceYear;
  }
  ngOnInit(): void {
    this.addForm();
    this.getAllClass();
    this.promotionaddForm();
  }
  addForm() {
    this.filterForm = new FormGroup({
      studentClass: new FormControl(null, [Validators.required]),
      section: new FormControl(null),
      academicYear: new FormControl(null, [Validators.required]),
    })
  }
  promotionaddForm() {
    this.promotionForm = new FormGroup({
      studentClass: new FormControl(null, [Validators.required]),
      section: new FormControl(null),
      academicYear: new FormControl(null, [Validators.required]),
      studentData: new FormControl(null, [Validators.required]),
      student: new FormControl(null, [Validators.required]),
    })
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      this.classes = resp.classes;
    });
  }
  setClass(classId) {
    this.sections = [];
    this.filterForm.patchValue({ section: 'select' });
    const id = classId;
    this.classes.forEach(element => {
      if (element._id === id) {
        this.sections = element.sections;
      }
    });
  }
  onChangeClass(event) {
    this.sections = [];
    const id = event.target.value;
    this.classes.forEach(element => {
      if (element._id === id) {
        this.sections = element.sections;
        this.filterForm.patchValue({ section: element?.sections[0]?._id });
      }
    });
  }
  getAllSection() {
    this.api.getAllSection().subscribe(resp => {
      this.sections = resp.sections;

    });
  }
  callReport(reportForm) {
    this.promotionForm.controls['student'].setValue('');
    this.promotionForm.controls['studentData'].setValue('');
    this.promteStudentEnable = false;
    this.promotionForm.updateValueAndValidity();
    const data = {
      academicYear: reportForm.value.academicYear,
      section: reportForm.value.studentClass?.sections[0]?._id,
      studentClass: reportForm.value.studentClass?._id,
    }
    this.spinner.show();
    this.studentData = [];
    this.options = [];
    this.api.studentList(data).subscribe(data => {
      this.spinner.hide();
      this.studentData = data['students'];
      this.getStudentPromteList();
      this.studentService.studentDetailBackAction.isBack = false;
      if (!this.api.isEmptyObject(this.studentData)) {
        this.visiblePromotion = true;
      }
       
    },
      (err) => {
        this.spinner.hide();
        this.studentData = [];
        this.toastr.error(err);
      })
  }
  studentChange(event) {
    this.notPromteStudentList = [];
    if (event.target.value == "2") {
      this.promteStudentEnable = true;
    }

    else {
      this.notPromteStudentList = this.options;
      this.promotionForm.controls['studentData'].setValue(this.notPromteStudentList);
      this.promteStudentEnable = false;
    }
  }
  getStudentPromteList() {
    if (!this.api.isEmptyObject(this.studentData)) {
      this.studentData.forEach(element => {
        this.options.push({
          _id: element._id,
          name: element.firstName + " " + element.lastName + " (" + element.registerNo + ")",
          registerNo: element.registerNo
        });
      });
    }
    console.log( this.options);
  }
  notPromotedStudentChange(event) {
    this.promotionForm.controls['studentData'].setValue(null);
    if (event.value?._id) {
      let isExist = this.notPromteStudentList.findIndex(x => x._id == event.value?._id);
      if (isExist == -1) {
        var notPromteStudentObj = {
          _id: event.value?._id,
          name: event.value?.name,
          registerNo: event.value?.registerNo
        };
        this.notPromteStudentList.push(notPromteStudentObj);
      }
      this.promotionForm.controls['studentData'].setValue(this.notPromteStudentList);
    }
  }
  deleteNotPromotedStudent(student) {
    let isExist = this.notPromteStudentList.findIndex(x => x._id == student._id);
    if (isExist > -1) {
      this.notPromteStudentList.splice(isExist, 1);
      this.promotionForm.controls['studentData'].setValue(this.notPromteStudentList);
    }

  }
  checkClass()
  {
    if(this.promotionForm.value?.studentClass==this.filterForm.value?.studentClass)
    {
      this.promotionForm.controls['studentClass'].setErrors({'isSameClass':true})
    }
    else
    {
      this.promotionForm.controls['studentClass'].setErrors(null);
    }
  }
  checkYear()
  {
    if(this.promotionForm.value?.academicYear==this.filterForm?.value.academicYear)
    {
      this.promotionForm.controls['academicYear'].setErrors({'isSameYear':true})
    }
    else
    {
      this.promotionForm.controls['academicYear'].setErrors(null);
    }
  }
  openQuickModal(template: TemplateRef<any>){
   this.modalRef = this.modalService.show(template);
  }
  closePopup(){
    this.modalRef.hide();
  }
  savePromotion(formData) {
    var  payload = {};
    if(!this.api.isEmptyObject(formData.value)) {
      if(formData.value.student === "1") { //promot all Student
        payload = {
          "academicYear":this.filterForm.value?.academicYear,
          "studentClass":this.filterForm.value?.studentClass?._id,
          "section":this.filterForm.value?.studentClass?.sections[0]?._id,
          "promoteacademicYear":formData.value?.academicYear,
          "promotestudentClass":formData.value?.studentClass?._id,
          "promoteSection":formData.value?.studentClass?.sections[0]?._id
        }
        this.api.promoteToAllStudent(payload).subscribe(resp => {
          this.closePopup();
          this.toastr.success(resp.message, "Promoted Successfully");
          this.filterForm.reset();
          this.promotionForm.reset();
          this.visiblePromotion=false;
        },
        (err) => {
          this.toastr.error(err, " Promotion Failed");
          console.error(err);
        })
      } else if(formData.value.student === "2"){ //Not to promot all Student
        var studentIDArr:any[] = [];
        formData.value.studentData.forEach(ele =>{
            studentIDArr.push(ele?._id);
        });
        payload = {
          "academicYear":this.filterForm.value?.academicYear,
          "studentClass":this.filterForm.value?.studentClass?._id,
          "section":this.filterForm.value?.studentClass?.sections[0]?._id,
          "promoteacademicYear":formData.value?.academicYear,
          "promotestudentClass":formData.value?.studentClass?._id,
          "promoteSection":formData.value?.studentClass?.sections[0]?._id,
          "studentId":studentIDArr
        }
        this.api.promoteWithSelectedStudent(payload).subscribe(resp => {
          this.closePopup();
          this.toastr.success(resp.message, "Promoted Successfully");
          this.filterForm.reset();
          this.promotionForm.reset();
          this.visiblePromotion=false;
        },
        (err) => {
          this.toastr.error(err, " Promotion Failed");
          console.error(err);
        });        
      }
    }
  }
}