import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService } from '../../student-details/student.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  constructor(private api: ApiService, private toastr: ToastrService,
    private studentService: StudentService, private spinner: NgxSpinnerService,private cd: ChangeDetectorRef) {
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
    console.log(event.target.value['section']);
  }
  getAllSection() {
    this.api.getAllSection().subscribe(resp => {
      this.sections = resp.sections;

    });
  }
  callReport(reportForm) {
    const data = {
      academicYear: reportForm.value.academicYear,
      section:  reportForm.value.studentClass?.sections[0]?._id,
      studentClass: reportForm.value.studentClass?._id,
    }
    this.spinner.show();
    this.api.studentList(data).subscribe(data => {
      this.spinner.hide();
      this.studentData = data['students'];
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
  savePromotion() {

  }
}
