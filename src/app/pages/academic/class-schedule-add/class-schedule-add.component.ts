import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StudentService } from '../../student-details/student.service';
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
  existSchedata:any[] =[];
  isShowScheduleData = false;
  aceYear:any[] = [];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder,private studentService:StudentService) {
    this.createForm();
    this.aceYear = this.studentService.aceYear;
    this.rows = this.fb.array([]);
  }
  ngOnInit() {
    this.hrsData();
    this.getAllClass();
    this.getSubject();
    this.getTeacher();
    this.addForm.addControl('rows', this.rows);   
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
    this.api.getTeacherList().subscribe(resp => {
      this.teacherOption = resp.teachers;    
    });
  }
  onChangeClass(event){
    this.sections =[];
    this.addForm.patchValue({section: 'select'});
    const id = event.target.value;
    this.classes.forEach(element => {
        if(element._id === id) {
          this.sections = element.sections;
          this.addForm.patchValue({section: element?.sections[0]?._id});
        }
    });
  }
  createForm(){
    this.addForm = this.fb.group({
      scheduleId:[''],
      class: ['',Validators.required],
      section: ['',Validators.required],
      day: ['',Validators.required],
      year:['', Validators.required]
    });
  }

  onAddRow(data :any) {
    this.rows.push(this.createItemFormGroup(data));
  }
  createItemFormGroup(data:any): FormGroup {
    if(this.api.isEmptyObject(data)) {
      return this.fb.group({
        id:[''],
        break:  [''],
        subject:  ['', Validators.required],
        teacher:  ['',Validators.required],
        startTime:  ['',Validators.required],
        endTime:  ['', Validators.required],
        classRoom:  ['']
      });
    } else {
      const timeArr = (data?.time).split("-");
      console.log(timeArr);
      return this.fb.group({
        id:[data?._id],
        break:  [''],
        subject:  [data?.subject?._id, Validators.required],
        teacher:  [data?.teacher?._id,Validators.required],
        startTime:  [(timeArr[0]).trim(),Validators.required],
        endTime:  [(timeArr[1]).trim(), Validators.required],
        classRoom:  ['']
      });
    }
   
  }
  checkScheduleAvailable(formData){
    let payload ={
       academicYear :formData.value.year, 
      studentClass: formData.value.class,
      section:formData.value.section
    }
    this.isShowScheduleData = true;
   this.api.getScheculeDataByDay(payload,formData.value.day).subscribe(resp => {
    this.existSchedata = resp?.schedule?.activities;
    this.existSchedata.forEach(element =>{
      this.onAddRow(element);
    })
    this.addForm.patchValue({scheduleId: resp?.schedule?._id});
      
    },
    (err) => {
      this.onAddRow({});
      console.error(err);
    })
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
   
    if(!this.api.isEmptyObject(form.value.scheduleId)) {
      let payload ={
        scheduleId: form.value.scheduleId, 
        day : form.value.day, 
        type: '',
        activities: activeDat,
        academicYear :form.value.year, 
        studentClass: form.value.class,
        section:form.value.section
      }
      this.api.updateSchedule(payload).subscribe(resp => {
        console.log(resp);
        this.toastr.success(resp.message, "Updated success");
        this.router.navigate(['/academic/class-schedule']);
      },
      (err) => {
         this.toastr.error(err, " update failed");
        console.error(err);
      })
    } else {
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

}
