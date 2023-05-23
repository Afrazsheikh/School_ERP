import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService } from '../../student-details/student.service';

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
  classes:  any
  sections: any[] = [];
  subjects: any[] = [];
  students:  any[] = [];
  academics:  any[] = [];
  filter = {
    examId: "select",
    class: "select",
    academicYear: "select",
    section: "select",
    subject: "select"
  };


  constructor(private api: ApiService,private toastr: ToastrService,private studentService:StudentService  ) {

  }


  ngOnInit(): void
  {
    this.getAllMarks();
    this.getAllExam();
    this.getAllClass();
    this.getAllSection();
    this.getSubject();
    this.getAllStudent();
    this.getAllAcademics();
  }
getAllAcademics(){
  this.academics = this.studentService.aceYear;
/*

  this.api.getAllAcademic().subscribe(resp => {


    this.academics = resp.academics
    console.log(this.academics);

//  this.mapAcademicYear()

  });
*/
}

getAllStudent()
{
  this.api.getAllStudent().subscribe(resp => {
    console.log(resp);

    this.students = resp.students
  });

}

getSubject()
{

  this.api.getAllSubjects().subscribe(resp => {
    console.log(resp);
    this.subjects = resp.subjects
  });

}

getAllSection(){
  this.api.getAllSection().subscribe(resp => {
    console.log(resp);

    this.sections = resp.sections
  });

}


clickFilter()
{
  console.log(this.filter);
  this.filteredMarks = this.marksEntries.filter(mark => mark.examId === this.filter.examId &&
                                                        mark.subject === this.filter.subject &&
                                                        mark.student.academic._id === this.filter.academicYear &&
                                                        mark.student.academic.studentClass === this.filter.class &&
                                                        mark.student.academic.subjects.includes(this.filter.subject));

}

getAllMarks()
{

  this.api.getMarksAll().subscribe(resp => {
    this.marksEntries = resp.marks;
    this.filteredMarks = resp.marks;
    this.patchStudent();
  });
}

  patchStudent()
  {
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

    this.api.getAllExam().subscribe((res)=>{
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
  this.sections =[];
  this.filter.section = 'select'
  const id = event.target.value;
  this.classes.forEach(element => {
      if(element._id === id) {
        this.sections = element.sections;
      }
  });
 }

  updateMarks(marks)
  {
    this.isLoading = true;
    const postData = marks;
    postData['marksId'] = postData._id;
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
