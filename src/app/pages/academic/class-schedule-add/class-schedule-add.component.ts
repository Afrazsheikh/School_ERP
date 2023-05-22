import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({ 
  selector: 'app-class-schedule-add',
  templateUrl: './class-schedule-add.component.html',
  styleUrls: ['./class-schedule-add.component.scss']
})
export class ClassScheduleAddComponent {
  addForm:FormGroup;
  rows: FormArray;
  sections: any[] = [];
  classes: any[] = [];
  dayOption= [{name:'Sunday'},{name:'Monday'}, {name:'Tuesday'}, {name:'Wednesday'}, {name:'Thursday'}, {name:'Friday'} ,{name:'Saturday'}]
  subjectOption = [];
  teacherOption = []
  employees =[];
  hrs = [];
  mins = ["00", "30"];
  aceYear = [{ _id: "2020-2021", name: "2020-2021" }, { _id: "2021-2022", name: "2021-2022" }, { _id: "2022-2023", name: "2022-2023" }];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder) {
    this.createForm();
    this.rows = this.fb.array([]);
  }
  ngOnInit() {
    this.hrsData();
    this.getAllClass();
    this.getSubject();
    this.getTeacher();
    this.addForm.addControl('rows', this.rows);
    this.onAddRow();
  }
  hrsData() {
    this.hrs = [];
    for (let i = 1; i <= 23; i++) {
      this.mins.forEach(minute => {
        let str = `${i}:${minute}`;
        this.hrs.push(str);
      });     
    }
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      console.log(resp);
      this.classes = resp.classes
    });
  }
  getSubject(){
    this.api.getAllSubjects().subscribe(resp => {
      this.subjectOption = resp.subjects
    });
  }
  getTeacher()
  {
    this.api.getAllEmployees().subscribe(resp => {
      this.employees = resp.employees;
      this.teacherOption = this.employees.filter(emp => (emp?.designation?.name).toLowerCase() == 'teacher');     
    });
  }
   /*getTeacher(){
   this.api.getEmployeeByRole('64350b305165343b13a004d3').subscribe(resp => {
      this.teacherOption = resp.employees;
      console.log(this.teacherOption);
    }); 
  }*/
  onChangeClass(event){
    this.sections =[];
    this.addForm.patchValue({section: 'select'});
    const id = event.target.value;
    this.classes.forEach(element => {
        if(element._id === id) {
          this.sections = element.sections;
        }
    });
  }
  createForm(){
    this.addForm = this.fb.group({
      class: ['',Validators.required],
      section: ['',Validators.required],
      day: ['',Validators.required],
      year:['', Validators.required]
    });
  }
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }
  createItemFormGroup(): FormGroup {
    return this.fb.group({
      break:  [''],
      subject:  ['', Validators.required],
      teacher:  ['',Validators.required],
      startTime:  ['',Validators.required],
      endTime:  ['', Validators.required],
      classRoom:  ['']
    });
  }
  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }
  saveScheduleRecord(form){
    console.log(form.value);
    var activeDat =[];
    var rowA ={};
    form.value.rows.forEach(element => {
        rowA ={'time' : element.startTime + " - " + element.endTime, 'teacher': element.teacher, 'subject':element.subject};
      activeDat.push(rowA);
    });
    let payload ={
      day : form.value.day, 
      type: '', 
      academicYear :form.value.year, 
      studentClass: form.value.class,
      section:form.value.section,
      activities: activeDat
    }
   this.api.addSchedule(payload).subscribe(resp => {
      console.log(resp);
      this.toastr.success(resp.message, "Added success");
      this.router.navigate(['/academic/class-schedule']);
    },
    (err) => {
       this.toastr.error(err, " add failed");
      console.error(err);
    })
  }

}
