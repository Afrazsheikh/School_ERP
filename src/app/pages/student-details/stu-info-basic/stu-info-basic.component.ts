import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService} from '../student.service';
@Component({
  selector: 'app-stu-info-basic',
  templateUrl: './stu-info-basic.component.html',
  styleUrls: ['./stu-info-basic.component.scss']
})
export class StuInfoBasicComponent {
  @Input() studentData: any ;
  studentBasic:any;
  studentForm:FormGroup;
  sections: any[] = [];
  classes: any[] = [];
  categoryData:any[] = [];
  typeList: any[] = [];
  aceYear: any[] = [];
  genderList: any[] = [];
  bloodGrList: any[] = [];
  religionList: any[] = [];  
  motherToungLanList: any[] = []; 
  castList: any[] = []; 
  relationShipList:any[] =[];
  occupationsList:any[] = [];
  educationList:any[] =[];

  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder, private studentService:StudentService) {
    this.aceYear = this.studentService.aceYear;
    this.genderList = this.studentService.genderList;
    this.bloodGrList = this.studentService.bloodGrList;
    this.religionList = this.studentService.religionList;
    this.motherToungLanList = this.studentService.language;
    this.castList = this.studentService.castList;
    this.typeList = this.studentService.typeList;
    this.relationShipList = this.studentService.relationShipList;
    this.occupationsList = this.studentService.occupationsList;
    this.educationList = this.studentService.educationList;
  }
 ngOnInit() {
  this.getAllClass();
  this.getAllSection();
  this.getAllCateogy();
  this.studentBasic = this.studentData;
  this.createForm();
 }
 getAllSection() {
  this.api.getAllSection().subscribe(resp => {
    this.sections = resp.sections
  });
}
getAllClass() {
  this.api.getAllClass().subscribe(resp => {
    this.classes = resp.classes
  });
}
getAllCateogy(){
  this.api.getCategory().subscribe(data =>{
    this.categoryData = data.categories;
   });
}
selectedClass(classID, SectionID){
  this.sections =[];
  const id = classID;
  this.classes.forEach(element => {
      if(element._id === id) {
        this.sections = element.sections;
      }
  });
  this.studentForm.patchValue({section: SectionID});
}
onChangeClass(event){
  this.sections =[];
  this.studentForm.patchValue({section: 'select'});
  const id = event.target.value;
  this.classes.forEach(element => {
      if(element._id === id) {
        this.sections = element.sections;
      }
  });
}
 createForm(){
  
  if(this.studentBasic?.dob !== '' && this.studentBasic?.dob !== null && this.studentBasic?.dob !== undefined) {
    this.studentBasic.dob = new Date(this.studentBasic.dob);
  }
  this.studentForm = this.fb.group({ 
      id:[this.studentBasic._id],
      academicYear: [this.studentBasic?.academic?.academicYear, Validators.required],
      studentClass: [this.studentBasic?.academic?.studentClass?._id, Validators.required],
      section: [this.studentBasic?.academic?.section?._id, Validators.required],
      category: [this.studentBasic?.category?._id, Validators.required],      
      registerNo: [this.studentBasic?.registerNo, Validators.required],
      rollNo: [this.studentBasic?.rollNo, Validators.required],
      admissionDate: [this.studentBasic?.admissionDate, Validators.required],
      type: [this.studentBasic?.type, Validators.required],
      firstName: [this.studentBasic?.firstName, Validators.required],
      lastName: [this.studentBasic?.lastName, Validators.required],
      gender: [this.studentBasic?.gender, Validators.required],
      bloodGroup: [this.studentBasic?.bloodGroup, Validators.required],
      dob: [this.studentBasic?.dob, Validators.required],
      motherTongue: [this.studentBasic?.motherTongue, Validators.required],
      religion: [this.studentBasic?.religion, Validators.required],
      caste: [this.studentBasic?.caste, Validators.required],
      email: [this.studentBasic?.email, Validators.required],
      mobileNumber: [this.studentBasic?.number, Validators.required],
      city: [this.studentBasic?.city, Validators.required],
      state: [this.studentBasic?.state, Validators.required],
      previousQualification:[this.studentBasic?.previousSchoolName],
      previousSchoolName:[this.studentBasic?.previousQualification],
      previousRemarks:[this.studentBasic?.previousRemarks],
      guardian: this.fb.group({
           id:[this.studentBasic?.guardian?._id],
           name: [this.studentBasic?.guardian?.firstName],
           relation:[this.studentBasic?.guardian?.relation],
           fatherName:[this.studentBasic?.guardian?.fatherName],
           motherName:[this.studentBasic?.guardian?.motherName],
           occupation:[this.studentBasic?.guardian?.occupation],
           education:[this.studentBasic?.guardian?.education],
           mobileNumber:[this.studentBasic?.guardian?.number],
           email:[this.studentBasic?.guardian?.email],
           city:[this.studentBasic?.guardian?.city],
           state:[this.studentBasic?.guardian?.state],
           permanentAddress:[this.studentBasic?.guardian?.permanentAddress],
           userName:[this.studentBasic?.guardian?.userName],
           password:[this.studentBasic?.guardian?.password]
      }),
      presentAddress: [this.studentBasic?.presentAddress, Validators.required],
      permanentAddress: [this.studentBasic?.permanentAddress, Validators.required],
    });
    console.log( this.studentForm);
 }
 updateInfo(formData:any){
  const gauValue = formData.value.guardian;
  const guardianArr ={
    _id:gauValue.id,
    firstName: gauValue.name,
    relation:gauValue.relation,
    fatherName:gauValue.fatherName,
    motherName:gauValue.motherName,
    occupation:gauValue.occupation,
    number:gauValue.mobileNumber,
    email:gauValue.email,
    city:gauValue.city,
    state:gauValue.state,
    permanentAddress:gauValue.permanentAddress,
    userName:gauValue.userName,
    education:gauValue.education
  }
  const payload ={
    academicYear : formData.value.academicYear,    
    section: formData.value.section, 
    category:formData.value.category,
    studentClass: formData.value.studentClass,
    registerNo: formData.value.registerNo,    
    rollNo:formData.value.rollNo,
    admissionDate: formData.value.admissionDate, 
    type:formData.value.type,
    firstName:formData.value.firstName,
    lastName:formData.value.lastName,
    gender:formData.value.gender,
    bloodGroup:formData.value.bloodGroup,
    dob:formData.value.dob,
    motherTongue:formData.value.motherTongue,
    religion:formData.value.religion,
    caste:formData.value.caste,
    email:formData.value.email,
    city:formData.value.city,
    state:formData.value.state,
    number:formData.value.mobileNumber,
    previousQualification:formData.value.previousQualification,
    previousSchoolName:formData.value.previousSchoolName,
    previousRemarks:formData.value.previousRemarks,
    guardian:guardianArr
  }
  this.api.editStudent(payload,this.studentBasic._id).subscribe(resp => {
    this.toastr.success(resp.message, "Updated Successfully");
   
  },
  (err) => {
    this.toastr.error(err, " Update Failed");
    console.error(err);
  })
 }
}