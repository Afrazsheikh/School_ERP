import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService} from '../student.service';
import { MatCheckbox } from '@angular/material/checkbox';
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
  stateList:any[] = [];
  emailPattern =  '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  @ViewChild('guardian2PrimaryGuard') private guardian2PrimaryGuard: MatCheckbox;
  @ViewChild('guardian1PrimaryGuard') private guardian1PrimaryGuard: MatCheckbox;
  isRequiredSign:boolean=false;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder, private studentService:StudentService) {
    this.aceYear = this.studentService.aceYear;
    this.genderList = this.studentService.genderList;
    this.bloodGrList = this.studentService.bloodGrList;
    this.religionList = this.studentService.religionList;
    this.motherToungLanList = this.studentService.language;
    this.castList = this.studentService.castList;
 //  this.typeList = this.studentService.typeList;
    this.relationShipList = this.studentService.relationShipList;
    this.occupationsList = this.studentService.occupationsList;
    this.educationList = this.studentService.educationList;
    this.stateList = this.studentService.indiaStateList;
    this.getTypeList();
    this.getAllSection();
  }
 ngOnInit() {
  this.getAllClass();
  
  this.getAllCateogy();
  this.studentBasic = this.studentData;
  this.createForm();
 }
 getTypeList(){
  this.api.getAdmissionTypeAll().subscribe(resp => {
    this.typeList = resp?.type
  },
    (err) => {
       console.error(err);
    })
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
      section: [this.studentBasic?.academic?.section?._id],
      category: [this.studentBasic?.category?._id, Validators.required],      
      registerNo: [{value:this.studentBasic?.registerNo,disabled:true }, Validators.required],
      rollNo: [this.studentBasic?.rollNo],
      admissionDate: [this.studentBasic?.admissionDate, Validators.required],
      type: [this.studentBasic?.type],
      firstName: [this.studentBasic?.firstName, Validators.required],
      lastName: [this.studentBasic?.lastName, Validators.required],
      gender: [this.studentBasic?.gender, Validators.required],
      bloodGroup: [this.studentBasic?.bloodGroup, Validators.required],
      dob: [this.studentBasic?.dob, Validators.required],
      motherTongue: [this.studentBasic?.motherTongue, Validators.required],
      religion: [this.studentBasic?.religion, Validators.required],
      caste: [this.studentBasic?.caste, Validators.required],
      email: [this.studentBasic?.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      mobileNumber: [this.studentBasic?.number, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      previousQualification:[this.studentBasic?.previousQualification],
      previousSchoolName:[this.studentBasic?.previousSchoolName],
      previousRemarks:[this.studentBasic?.previousRemarks],
      status:[this.studentBasic?.active],
      guardian1:this.fb.group({
        relation: [this.studentBasic?.guardian?.relation, Validators.required],
        setAsPrimaryGuradian:[this.studentBasic?.guardian?.isPrimary],
        fullName: [this.studentBasic?.guardian?.firstName, Validators.required],
        mobileNumber: [this.studentBasic?.guardian?.number, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        email: [this.studentBasic?.guardian?.email, [Validators.required, Validators.pattern(this.emailPattern)]],
        occupation: [this.studentBasic?.guardian?.occupation, Validators.required],
        alreadyExists:[this.studentBasic?.guardian?.alreadyExists]
      }),
      guardian2:this.fb.group({
        relation: [this.studentBasic?.guardian2?.relation],
        setAsPrimaryGuradian:[this.studentBasic?.guardian2?.isPrimary],
        fullName: [this.studentBasic?.guardian2?.firstName],
        mobileNumber: [this.studentBasic?.guardian2?.number,[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        email: [this.studentBasic?.guardian2?.email, [Validators.pattern(this.emailPattern)]],
        occupation: [this.studentBasic?.guardian2?.occupation]
      
      }), 
      isSameAddress:[false],
      userName: [this.studentBasic?.guardian?.userName, Validators.required],
      password: [this.studentBasic?.guardian?.password, Validators.required],     
      presentAddressHouseNo: [this.studentBasic?.presentAddressHouseNo,Validators.required],
      presentAddressStreet: [this.studentBasic?.presentAddressStreet, Validators.required],
      presentAddressZipCode: [this.studentBasic?.presentAddressZipCode,[Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]],
      presentAddressState: [this.studentBasic?.presentAddressState, Validators.required],
      presentAddressCity: [this.studentBasic?.presentAddressCity, Validators.required],    
      permanentAddressHouseNo: [this.studentBasic?.premanentAddressHouseNo, Validators.required],
      permanentAddressStreet: [this.studentBasic?.premanentAddressStreet, Validators.required],
      permanentAddressZipCode: [this.studentBasic?.premanentAddressZipCode, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]],
      permanentAddressCity: [this.studentBasic?.premanentAddressCity, Validators.required],
      permanentAddressState:[this.studentBasic?.premanentAddressState, Validators.required],
    });
    console.log( this.studentForm);
 }
 updateInfo(formData:any){
  const gauValue1 = formData.value.guardian1;
  const gauValue2 = formData.value.guardian2;
  const guardianArr1 ={
    _id:gauValue1.id,
    relation: gauValue1.relation,
    isPrimary: gauValue1.setAsPrimaryGuradian,
    firstName: gauValue1.fullName,
    number: gauValue1.mobileNumber,
    email: gauValue1.email,
    alreadyExists:gauValue1.alreadyExists,
    occupation: gauValue1.occupation,
    userName:formData.value.userName,
    password:formData.value.password
  }
  const guardianArr2 = {
    relation: gauValue2.relation,
    isPrimary: gauValue2.setAsPrimaryGuradian,
    firstName: gauValue2.fullName,
    number: gauValue2.mobileNumber,
    email: gauValue2.email,
    occupation:gauValue2.occupation,
  }
  var sectionId = formData.value.section;
  if(!this.api.isEmptyObject(formData.value.studentClass)){
    this.classes.forEach(element => {
      if(element._id === formData.value.studentClass) {
        this.sections = element.sections;
        sectionId = element?.sections[0]?._id;
      }
  });
 
  }
  const payload ={
    academicYear : formData.value.academicYear,    
    section: sectionId, 
    category:formData.value.category,
    studentClass: formData.value.studentClass,
    registerNo: formData.value.registerNo,    
  //  rollNo:formData.value.rollNo,
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
    guardian:guardianArr1,
    guardian1:guardianArr2,
    presentAddressHouseNo: formData.value.presentAddressHouseNo,
    presentAddressStreet:formData.value.presentAddressStreet,
    presentAddressZipCode: formData.value.presentAddressZipCode,
    presentAddressCity: formData.value.presentAddressCity,
    presentAddressState:formData.value.presentAddressState,
    premanentAddressHouseNo: formData.value.permanentAddressHouseNo,
    premanentAddressStreet: formData.value.permanentAddressStreet,
    premanentAddressZipCode: formData.value.permanentAddressZipCode,
    premanentAddressCity: formData.value.permanentAddressCity,
    premanentAddressState: formData.value.permanentAddressState,
    active:(formData.value.status)
  }
  this.api.editStudent(payload,this.studentBasic._id).subscribe(resp => {
    this.toastr.success(resp.message, "Updated Successfully");
   
  },
  (err) => {
    this.toastr.error(err, " Update Failed");
    console.error(err);
  })
 }
 getVAlue(event){
 
   if (event.checked === true) {
     const presentA = this.studentForm.get('presentAddressHouseNo')?.value;
     this.studentForm.patchValue({
      permanentAddressHouseNo: this.studentForm.get('presentAddressHouseNo')?.value,
      permanentAddressStreet: this.studentForm.get('presentAddressStreet')?.value,
      permanentAddressZipCode: this.studentForm.get('presentAddressZipCode')?.value,
      permanentAddressCity: this.studentForm.get('presentAddressCity')?.value,
      permanentAddressState: this.studentForm.get('presentAddressState')?.value,
     });
   } else {
     this.studentForm.patchValue({
      permanentAddressHouseNo: this.studentBasic?.premanentAddressHouseNo,
      permanentAddressStreet: this.studentBasic?.premanentAddressStreet,
      permanentAddressZipCode: this.studentBasic?.premanentAddressZipCode,
      permanentAddressCity: this.studentBasic?.premanentAddressCity,
      permanentAddressState: this.studentBasic?.premanentAddressState
     });
   }
   this.studentForm.updateValueAndValidity();
}
primaryGuradianChange(Id)
  {
    if(Id=="guardian1PrimaryGuard")
    {
      if(this.guardian1PrimaryGuard.checked==false)
      {
        this.guardian1PrimaryGuard.checked=false;
        this.isRequireSignfalse();
        this.dynamicValidationApplyRemoveinGuardian(false);
        this.addValidationGuardin1PrimaryGuradian();
      }
      else
      {
        this.guardian1PrimaryGuard.checked=true;
        this.isRequireSignfalse();
        this.dynamicValidationApplyRemoveinGuardian(false);
        this.removeValidationguardin1PrimaryGuradian();
      }
      this.guardian2PrimaryGuard.checked=false;
      this.studentForm.value.guardian2.setAsPrimaryGuradian=false;
    }
    else
    {
      if(this.guardian2PrimaryGuard.checked==false)
      {
        this.guardian2PrimaryGuard.checked=false;
        this.isRequireSignfalse();
        this.dynamicValidationApplyRemoveinGuardian(false);
        this.addValidationGuardin1PrimaryGuradian();
      }
      else
      {
        this.guardian2PrimaryGuard.checked=true;
        this.isRequireSignTrue();
        this.dynamicValidationApplyRemoveinGuardian(true);
        this.removeValidationguardin1PrimaryGuradian();
      }
      this.guardian1PrimaryGuard.checked=false;
      this.studentForm.value.guardian1.setAsPrimaryGuradian=false;
    }
  }

  isRequireSignTrue()
  {
    this.isRequiredSign=true;
  }
  isRequireSignfalse()
  {
    this.isRequiredSign=false;
  }
  dynamicValidationApplyRemoveinGuardian(isapply) {
    if (isapply) {
      this.studentForm.get('guardian2.fullName').addValidators(Validators.required);//apply validation
      this.studentForm.get('guardian2.fullName').updateValueAndValidity();//update value and validation on controller.
      this.studentForm.get('guardian2.mobileNumber').addValidators(Validators.required);
      this.studentForm.get('guardian2.mobileNumber').updateValueAndValidity();
      this.studentForm.get('guardian2.email').addValidators(Validators.required);
      this.studentForm.get('guardian2.email').updateValueAndValidity();
      this.studentForm.get('guardian2.occupation').addValidators(Validators.required);
      this.studentForm.get('guardian2.occupation').updateValueAndValidity();
      this.studentForm.get('guardian2.setAsPrimaryGuradian').addValidators(Validators.required);
      this.studentForm.get('guardian2.setAsPrimaryGuradian').updateValueAndValidity();
    }
    else {
      this.studentForm.get('guardian2.fullName').clearValidators();//validation remove 
      this.studentForm.get('guardian2.fullName').setErrors(null);//remove validation message
      this.studentForm.get('guardian2.mobileNumber').clearValidators();
      this.studentForm.get('guardian2.mobileNumber').setErrors(null);
      this.studentForm.get('guardian2.email').clearValidators();
      this.studentForm.get('guardian2.email').setErrors(null);
      this.studentForm.get('guardian2.occupation').clearValidators();
      this.studentForm.get('guardian2.occupation').setErrors(null);
      this.studentForm.get('guardian2.setAsPrimaryGuradian').clearValidators();
    }
  }
  removeValidationguardin1PrimaryGuradian()
  {
    this.studentForm.get('guardian1.setAsPrimaryGuradian').clearValidators();
    this.studentForm.get('guardian1.setAsPrimaryGuradian').setErrors(null);
  }
  addValidationGuardin1PrimaryGuradian()
  {
    this.studentForm.get('guardian1.setAsPrimaryGuradian').addValidators(Validators.required);
      this.studentForm.get('guardian1.setAsPrimaryGuradian').updateValueAndValidity();
  }
}