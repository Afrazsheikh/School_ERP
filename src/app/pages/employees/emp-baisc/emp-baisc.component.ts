import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentService } from '../../student-details/student.service';
import * as moment from 'moment';
@Component({
  selector: 'app-emp-baisc',
  templateUrl: './emp-baisc.component.html',
  styleUrls: ['./emp-baisc.component.scss']
})
export class EmpBaiscComponent {
  @Input() employeeData: any ;
  empB1Form:FormGroup;
  empBasic:any;
  bloodGrList: any[] = [];
  genderList: any[] = [];
  religionList: any[] = [];
  departments: any[] = [];
  designations: any[] = [];
  stateList:any[] = [];
  address= {'present':[], 'permanent':[]};
  emailPattern =  '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  constructor(private api: ApiService,private toastr: ToastrService, private router: Router,public fb: FormBuilder,private studentService: StudentService) {
    this.genderList = this.studentService.genderList;
    this.bloodGrList = this.studentService.bloodGrList;
    this.religionList = this.studentService.religionList;
    this.stateList = this.studentService.indiaStateList;
  }
 ngOnInit() {
  this.empBasic = this.employeeData;
  this.getDepartments();
  this.getDesignations();
  this.createFrom();
 }
 getDepartments() {
  this.api.getDepartments().subscribe(resp => {
    this.departments = resp.departments;
  });
}
getDesignations() {
  this.api.getDesignations().subscribe(resp => {
    this.designations = resp.designations
  });
}
 createFrom(){
  if(this.empBasic?.joiningDate !== '' && this.empBasic?.joiningDate !== null && this.empBasic?.joiningDate !== undefined) {
    this.empBasic.joiningDate = new Date(this.empBasic.joiningDate);
  }
  if(this.empBasic?.dob !== '' && this.empBasic?.dob !== null && this.empBasic?.dob !== undefined) {
    this.empBasic.dob = new Date(this.empBasic.dob);
  }
 
  this.empB1Form = this.fb.group({ 
      id:[this.empBasic._id],
      department: [this.empBasic?.department?._id, Validators.required],
      designation: [this.empBasic?.designation?._id, Validators.required],
      joiningDate: [this.empBasic?.joiningDate, Validators.required],
      qualification: [this.empBasic?.qualification, Validators.required],      
      experienceDetails: [this.empBasic?.experienceDetails, Validators.required],
      totalExperience: [this.empBasic?.totalExperience, Validators.required],
      gender: [this.empBasic?.gender, Validators.required],
      name: [this.empBasic?.name, Validators.required],
      dob: [this.empBasic?.dob, Validators.required],
      religion: [this.empBasic?.religion, Validators.required],      
      bloodGroup: [this.empBasic?.bloodGroup, Validators.required],
      number: [this.empBasic?.number, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [this.empBasic?.email,[Validators.required, Validators.pattern(this.emailPattern)]],
      presentAddressHouseNo: [this.empBasic?.presentAddressHouseNo,Validators.required],
      presentAddressStreet: [this.empBasic?.presentAddressStreet, Validators.required],
      presentAddressZipCode: [this.empBasic?.presentAddressZipCode,[Validators.pattern("^((\\+91-?)|0)?[0-9]{5}$")]],
      presentAddressState: [this.empBasic?.presentAddressState, Validators.required],
      presentAddressCity: [this.empBasic?.presentAddressCity, Validators.required],    
      permanentAddressHouseNo: [this.empBasic?.premanentAddressHouseNo, Validators.required],
      permanentAddressStreet: [this.empBasic?.premanentAddressStreet, Validators.required],
      permanentAddressZipCode: [this.empBasic?.premanentAddressZipCode, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{5}$")]],
      permanentAddressCity: [this.empBasic?.premanentAddressCity, Validators.required],
      permanentAddressState:[this.empBasic?.premanentAddressState, Validators.required],
      isSameAddress:[false],
      facebook: [this.empBasic?.facebook],      
      twitter: [this.empBasic?.twitter],
      linkedin: [this.empBasic?.linkedin],
      userName: [this.empBasic?.userName],
      password: [this.empBasic?.password],
    });
 }

 updateInfo(formData){
  const payload = {
    employeeId : formData.value.id,
    designation: formData.value.designation, 
    department :formData.value.department,
    joiningDate: moment(formData.value.joiningDate).format('MM/DD/YYYY'), 
    qualification : formData.value.qualification, 
    experienceDetails :formData.value.experienceDetails, 
    totalExperience :formData.value.totalExperience, 
    name :formData.value.name, 
    gender :formData.value.gender, 
    bloodGroup :formData.value.bloodGroup, 
    religion :formData.value.religion, 
    dob :moment(formData.value.dob).format('MM/DD/YYYY'), 
    number :formData.value.number, 
    email :formData.value.email, 
    city: formData.value.city, 
    state: formData.value.state, 
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
    userName: formData.value.userName, 
    password :formData.value.password, 
    facebook: formData.value.facebook, 
    twitter: formData.value.twitter, 
    linkedin:formData.value.linkedin
  }
  this.api.updateEmpployee(payload).subscribe(resp => {
   this.toastr.success(resp[0].msg, " Updated Successfully");
  },
    (err) => {
      this.toastr.error(err, " update failed");
    });
 }
 updatePermenentAdd(){
  var presentA =  ''; var housno =''; var aprtment =''; var landmark = ''; var zipcode ='';

  if(!this.api.isEmptyObject(this.empB1Form.get('houseNo')?.value)) {
    housno = this.empB1Form.get('houseNo')?.value;
  }
  if(!this.api.isEmptyObject(this.empB1Form.get('apartment')?.value)) {
    aprtment = ", "+this.empB1Form.get('apartment')?.value;
  }
  if(!this.api.isEmptyObject(this.empB1Form.get('landmark')?.value)) {
    landmark = ", "+this.empB1Form.get('landmark')?.value;
  }
  if(!this.api.isEmptyObject(this.empB1Form.get('zipcode')?.value)) {
    zipcode = ", "+this.empB1Form.get('zipcode')?.value;
  }
  presentA = housno+ aprtment+landmark+zipcode;
    this.empB1Form.patchValue({
      presentAddress:presentA
    })  ;
    this.empB1Form.updateValueAndValidity();
 }
 updatePersentAdd(){
  var presentA =  ''; var housno =''; var aprtment =''; var landmark = ''; var zipcode ='';

  if(!this.api.isEmptyObject(this.empB1Form.get('houseNo1')?.value)) {
    housno = this.empB1Form.get('houseNo1')?.value;
  }
  if(!this.api.isEmptyObject(this.empB1Form.get('apartment1')?.value)) {
    aprtment = ", "+this.empB1Form.get('apartment1')?.value;
  }
  if(!this.api.isEmptyObject(this.empB1Form.get('landmark1')?.value)) {
    landmark = ", "+this.empB1Form.get('landmark1')?.value;
  }
  if(!this.api.isEmptyObject(this.empB1Form.get('zipcode1')?.value)) {
    zipcode = ", "+this.empB1Form.get('zipcode1')?.value;
  }
  presentA = housno+ aprtment+landmark+zipcode;
    this.empB1Form.patchValue({
      permanentAddress:presentA
    })  ;
    this.empB1Form.updateValueAndValidity();
 }
 getVAlue(event){
  console.log(event.checked);
 
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
   this.empB1Form.updateValueAndValidity();
}
   
}
