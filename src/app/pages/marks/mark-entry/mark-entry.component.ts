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
    this.getAllMarks();
    this.getAllExam();
    this.getAllClass();
    this.getAllSection();
    this.getSubject();
    this.getAllAcademics();
  }
  createForm() {
    this.addForm = this.fb.group({
      examId: [''],
      classId: ['',Validators.required],
      academicYear: ['', Validators.required],
      section: ['', Validators.required],
      subject: ['']
    });
  }
  onAddRow(data) {
    this.rows.push(this.createItemFormGroup(data));
  }
  createItemFormGroup(data): FormGroup {
    console.log(data);
    return this.fb.group({
      marksId: [data?.marksId],
      subject: [data?.subject],
      practical: [data?.practical],
      written: [data?.written],
      academicYear: [data?.academicYear],
      studentClass: [data?.studentClass],
      section: [data?.section],
      firstName: [data?.firstName],
      lastName: [data?.lastName],
      caste: [data?.caste],
      registerNo: [data?.registerNo],
      isAbsent: [data?.isAbsent]
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
    }
    this.spinner.show();
    this.api.studentList(data).subscribe(data => {
      this.spinner.hide();
      this.filteredMarks = data['students'];
      if(this.filteredMarks.length>0)
      {
        this.filteredMarks.forEach(element => {
          var studentMarks: any;
          studentMarks = {
            marksId: [0],
            subject: [this.addForm.value?.subject],
            practical: [0],
            written: [0],
            academicYear: [this.addForm.value?.academicYear],
            studentClass: [this.addForm.value?.classId],
            section: [this.addForm.value?.section],
            firstName: [element?.firstName],
            lastName: [element?.lastName],
            caste: [element?.caste],
            registerNo: [element?.registerNo],
            isAbsent: [false]
          };
          this.onAddRow(studentMarks);
          this.addForm.updateValueAndValidity();
        });
        this.studentService.studentDetailBackAction.isBack = false;
      //  this.isShowMarkEntiries=true;
      }

    },
      (err) => {
        this.spinner.hide();
        this.filteredMarks.forEach(element => {
          this.onAddRow(element);
        });
        this.addForm.updateValueAndValidity();
        this.addForm.updateValueAndValidity();
        this.toastr.error(err);
      })
  }

  getAllMarks() {

    this.api.getMarksAll().subscribe(resp => {
      this.marksEntries = resp.marks;
      this.filteredMarks = resp.marks;
      this.patchStudent();
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
  }

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
    this.isLoading = true;
    const postData = marks;
    console.log(marks);
    this.api.updateMarks(postData).subscribe(resp => {
      this.isLoading = false;
      this.getAllMarks();
      this.toastr.success(resp.message, "Marks update success");
    },
      (err) => {
        this.isLoading = false;
        postData['isLoading'] = false;
        this.toastr.error(err, "Marks update failed");
        console.error(err);
      })
  }

}
