import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService } from '../../student-details/student.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mark-entry',
  templateUrl: './mark-entry.component.html',
  styleUrls: ['./mark-entry.component.scss']
})
export class MarkEntryComponent {
  marksEntries: any[] = [];
  filteredMarks: any[] = [];
  exams: any
  marksEntryForm: FormGroup;
  isLoading: boolean;
  classes: any
  sections: any[] = [];
  subjects: any[] = [];
  students: any[] = [];
  academics: any[] = [];
  filter = {
    examId: "select",
    class: "select",
    academicYear: "select",
    section: "select",
    subject: "select"
  };
  addForm: FormGroup;
  rows: FormArray;
  isShowMarkEntiries:boolean=false;

  pageNo = 1;
  p: number = 1;
  pagingConfig = {
    'currentPage'  : 1,
    'itemsPerPage': 5,
    'totalItems' : 0
  }

  constructor(private api: ApiService,
    private toastr: ToastrService,
    private studentService: StudentService,
    public fb: FormBuilder,
    private spinner: NgxSpinnerService) {
    this.createForm();
    this.rows = this.fb.array([]);
    this.addForm.addControl('rows', this.rows);
  }


  ngOnInit(): void {
   // this.getAllMarks();
    this.getAllExam();
    this.getAllClass();
    this.getAllSection();
    this.getSubject();
    this.getAllAcademics();
  }
  createForm() {
    this.addForm = this.fb.group({
      examId: ['',Validators.required],
      classId: ['',Validators.required],
      academicYear: ['', Validators.required],
      section: ['', Validators.required],
      subject: ['',Validators.required]
    });
  }
  onAddRow(data) {
    this.rows.push(this.createItemFormGroup(data));
  }
  createItemFormGroup(data) {
    return this.fb.group({
      id: [data?.id],
      practical: [data?.practical],
      written: [data?.written],
      firstName: [data?.firstName],
      lastName: [data?.lastName],
      registerNo: [data?.registerNo],
      isAbsent: [data?.isAbsent],
      studentId:[data?.studentId]
    });
  }
  removeGroup() {
    const controlData = this.addForm.get('rows') as FormArray;
    controlData.clear();
    this.addForm.updateValueAndValidity();
  }
  getAllAcademics() {
    this.academics = this.studentService.aceYear;
  }
  getSubject() {
    this.api.getAllSubjects().subscribe(resp => {
      console.log(resp);
      this.subjects = resp.subjects
    });

  }

  getAllSection() {
    this.api.getAllSection().subscribe(resp => {
      console.log(resp);
      this.sections = resp.sections
    });

  }


  clickFilter(addForm) {
    const data = {
      academicYear: addForm.value.academicYear,
      section: addForm.value.section,
      studentClass: addForm.value.classId,
      exam:addForm.value.examId,
      subject:addForm.value.subject,
    }
    this.pageNo =this.pagingConfig.currentPage;
    this.spinner.show();
    this.api.getMarksByAcademicPagWise(data, this.pageNo-1).subscribe(data => {
      this.spinner.hide();
      this.filteredMarks = data['studentMarks'];
      this.pagingConfig.totalItems = data['totalCount'];
      if(this.filteredMarks.length>0)
      {
        this.rows.clear();
        var studentMarks: any;
        this.filteredMarks.forEach(element => {
         
          studentMarks = {
          //  marksId: 0,
            id: element?._id,
         //   subject: element?.subject?._id,
            practical: element?.practical,
            written: element?.written,
         //   academicYear: this.addForm.value?.academicYear,
         //   studentClass: this.addForm.value?.classId,
         //   section: this.addForm.value?.section,
            firstName: element?.student?.firstName,
            lastName: element?.student?.lastName,
            studentId: element?.student?._id,
            registerNo: element?.student?.registerNo,
            isAbsent: element?.isAbsent
          };
          this.onAddRow(studentMarks);
          this.addForm.updateValueAndValidity();
        });
       this.isShowMarkEntiries=true;
      }

    },
      (err) => {
        this.spinner.hide();
       /* this.filteredMarks.forEach(element => {
          this.onAddRow(element);
        });
        this.addForm.updateValueAndValidity();
        this.addForm.updateValueAndValidity(); */
        this.toastr.error(err);
      })
  }
/*
  getAllMarks() {
    this.api.getMarksAll().subscribe(resp => {
      this.spinner.hide(); 
      this.marksEntries = resp.marks;
      this.filteredMarks = resp.marks;
      //this.patchStudent();
    });
  } 

  patchStudent() {
    this.api.getAllStudents().subscribe(resp => {
      const students = resp.students;
      this.filteredMarks.forEach(mark => {
        mark.student = students.find(stud => stud._id === mark.student);
        mark['isLoading'] = false;
      });
    });
  }*/

  getAllExam() {
    console.log("this");

    this.api.getAllExam().subscribe((res) => {
      this.exams = res.exams
      console.log(this.exams, "first res");

    })
  }

  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      console.log(resp);
      this.classes = resp.classes
    });
  }

  onChangeClass(event) {
    this.sections = [];
    this.filter.section = 'select'
    const id = event.target.value;
    this.classes.forEach(element => {
      if (element._id === id) {
        this.sections = element.sections;
        this.addForm.controls['section'].patchValue(this.sections[0]?._id);
      }
    });
  }

  updateMarks(marks) {
    console.log(marks.value);

    var payload:any[] = [];
    marks.value.rows.forEach(element => {
      payload.push({"id": element?.id,"student":element?.studentId, "isAbsent":element?.isAbsent,
       "practical":element?.practical, "written":element?.written});
    });
    this.isLoading = true;
    const finalPostData = {
      studentMarks: payload
    };
    console.log(marks);
    this.api.getMarksByAcademicAndStudent(finalPostData).subscribe(resp => {
      this.isLoading = false;
      this.clickFilter(this.addForm);
      this.toastr.success(resp['message'], "Marks updated Successfully");
    },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, "Marks update failed");
        console.error(err);
      }) 
  }
  pageChanged(event: any): void {
    this.pagingConfig.currentPage  = event;
    this.clickFilter(this.addForm);
   }

}
