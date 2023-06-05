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
      guardian1:this.fb.group({
        relation: ['', Validators.required],
        setAsPrimaryGuradian:[''],
        fullName: ['', Validators.required],
        mobileNumber: ['', Validators.required],
        email: ['', Validators.required],
        occupation: ['', Validators.required]
      }),
      guardian2:this.fb.group({
        relation: [''],
        setAsPrimaryGuradian:[''],
        fullName: [''],
        mobileNumber: [''],
        email: [''],
        occupation: ['']
      
      }), 
      userName: [this.studentBasic?.guardian?.userName, Validators.required],
      password: [this.studentBasic?.guardian?.password, Validators.required],     
      presentAddressHouseNo: [this.studentBasic?.presentAddressHouseNo,Validators.required],
      presentAddressStreet: [this.studentBasic?.presentAddressStreet, Validators.required],
      presentAddressZipCode: [this.studentBasic?.presentAddressZipCode,Validators.required],
      presentAddressState: [this.studentBasic?.presentAddressState, Validators.required],
      presentAddressCity: [this.studentBasic?.presentAddressCity, Validators.required],    
      permanentAddressHouseNo: [this.studentBasic?.premanentAddressHouseNo, Validators.required],
      permanentAddressStreet: [this.studentBasic?.premanentAddressStreet, Validators.required],
      permanentAddressZipCode: [this.studentBasic?.premanentAddressZipCode, Validators.required],
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
    setAsPrimaryGuradian: gauValue1.setAsPrimaryGuradian,
    fullName: gauValue1.fullName,
    number: gauValue1.mobileNumber,
    email: gauValue1.email,
    occupation: gauValue1.occupation,
    // firstName: gauValue.name,
    // relation:gauValue.relation,
    // fatherName:gauValue.fatherName,
    // motherName:gauValue.motherName,
    // occupation:gauValue.occupation,
    // number:gauValue.mobileNumber,
    // email:gauValue.email,
    // city:gauValue.city,
    // state:gauValue.state,
    // permanentAddress:gauValue.permanentAddress,
    // userName:gauValue.userName,
    // education:gauValue.education
  }
  const guardianArr2 = {
    relation: gauValue2.relation,
    setAsPrimaryGuradian: gauValue2.setAsPrimaryGuradian,
    fullName: gauValue2.fullName,
    number: gauValue2.mobileNumber,
    email: gauValue2.email,
    occupation:gauValue2.occupation,
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
    guardian1:guardianArr1,
    guardian2:guardianArr2,
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
  /*console.log(event.checked);
 
   if (event.checked === true) {
     const presentA = this.empB1Form.get('presentAddressHouseNo')?.value;
     this.empB1Form.patchValue({
      permanentAddressHouseNo: this.empB1Form.get('presentAddressHouseNo')?.value,
      permanentAddressStreet: this.empB1Form.get('presentAddressStreet')?.value,
      permanentAddressZipCode: this.empB1Form.get('presentAddressZipCode')?.value,
      permanentAddressCity: this.empB1Form.get('presentAddressCity')?.value,
      permanentAddressState: this.empB1Form.get('presentAddressState')?.value,
     });
   } else {
     this.empB1Form.patchValue({
      permanentAddressHouseNo: this.empBasic?.premanentAddressHouseNo,
      permanentAddressStreet: this.empBasic?.premanentAddressStreet,
      permanentAddressZipCode: this.empBasic?.premanentAddressZipCode,
      permanentAddressCity: this.empBasic?.premanentAddressCity,
      permanentAddressState: this.empBasic?.premanentAddressState
     });
   }
   this.empB1Form.updateValueAndValidity(); */
}
}