import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService } from '../../student-details/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { numbers } from '@material/toolbar';

@Component({
  selector: 'app-student-promotion',
  templateUrl: './student-promotion.component.html',
  styleUrls: ['./student-promotion.component.scss']
})
export class StudentPromotionComponent implements OnInit {
  filterForm: FormGroup;
  promotionForm: FormGroup;
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
  constructor(private api: ApiService, private toastr: ToastrService,
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
    const data = {
      academicYear: reportForm.value.academicYear,
      section: reportForm.value.studentClass?.sections[0]?._id,
      studentClass: reportForm.value.studentClass?._id,
    }
    this.spinner.show();
    this.api.studentList(data).subscribe(data => {
      this.spinner.hide();
      this.studentData = data['students'];
      this.getStudentPromteList();
      this.studentData.forEach(element => {
        element.promotioncheck = false;
      });
      this.studentService.studentDetailBackAction.isBack = false;
      if (this.studentData.length > 0)
        this.visiblePromotion = true;
    },
      (err) => {
        this.spinner.hide();
        this.studentData = [];
        this.toastr.error(err);
      })
  }
  allChkChange(event) {
    if (event.target.checked) {
      this.studentData.forEach(element => {
        element.promotioncheck = true;
      });
      this.selectChkCount = this.studentData.length;
      this.cd.detectChanges();
    }
    else {
      this.studentData.forEach(element => {
        element.promotioncheck = false;
      });
      this.selectChkCount = 0;
      this.cd.detectChanges();
    }
  }
  singalChkChange(event) {
    let totalStudents = this.studentData.length;
    if (event.target.checked == true) {
      this.selectChkCount++;
      this.mainChkSelectorUnselect(totalStudents, this.selectChkCount);
    }
    else {
      this.selectChkCount--;
      this.mainChkSelectorUnselect(totalStudents, this.selectChkCount);
    }
  }
  mainChkSelectorUnselect(totalStudents, selectChkCount) {
    if (totalStudents == selectChkCount) {
      this.allChkPromotion.nativeElement.checked = true;
    }
    else {
      this.allChkPromotion.nativeElement.checked = false;
    }
  }
  studentChange(event) {
    this.notPromteStudentList=[];
    if (event.target.value == "2") {
      this.promteStudentEnable = true;
    }

    else {
      this.notPromteStudentList=this.options;
      this.promotionForm.controls['studentData'].setValue(this.notPromteStudentList);
      this.promteStudentEnable = false;
    }
  }
  getStudentPromteList() {
    if (this.studentData.length > 0) {
      this.studentData.forEach(element => {
        this.options.push({
          _id: element._id,
          name: element.firstName + " " + element.lastName + " (" + element.registerNo + ")",
          registerNo: element.registerNo
        });
      });
    }
  }
  selectedGua(event) {
     this.promotionForm.controls['studentData'].setValue(null);
    if (event) {
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
  deleteNotPromotedStudent(student)
  {
    let isExist = this.notPromteStudentList.findIndex(x => x._id == student._id);
    if(isExist>-1)
    {
      this.notPromteStudentList.splice(isExist, 1);
      this.promotionForm.controls['studentData'].setValue(this.notPromteStudentList);
    }
    
  }
  savePromotion() {
    console.log("promotionForm",this.promotionForm.value);
  }
}
