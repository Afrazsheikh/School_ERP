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
  address= {'present':[], 'permanent':[]};
  constructor(private api: ApiService,private toastr: ToastrService, private router: Router,public fb: FormBuilder,private studentService: StudentService) {
    this.genderList = this.studentService.genderList;
    this.bloodGrList = this.studentService.bloodGrList;
    this.religionList = this.studentService.religionList;
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
  if(!this.api.isEmptyObject(this.empBasic?.presentAddress)){
   const myArray = this.empBasic?.presentAddress.split(',');
   if(!this.api.isEmptyObject(myArray)) {
    this.address.present = myArray;
   }
  }
  if(!this.api.isEmptyObject(this.empBasic?.permanentAddress)){
    const myArray1 = this.empBasic?.permanentAddress.split(',');
    if(!this.api.isEmptyObject(myArray1)) {
     this.address.permanent = myArray1;
    }
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
      number: [this.empBasic?.number, Validators.required],
      email: [this.empBasic?.email, Validators.required],
      houseNo: [this.address?.present[0]],
      apartment: [this.address?.present[1]],
      landmark: [this.address?.present[2]],
      zipcode: [this.address?.present[3]],
      houseNo1: [this.address?.permanent[0]],
      apartment1: [this.address?.permanent[1]],
      landmark1: [this.address?.permanent[2]],
      zipcode1: [this.address?.permanent[3]],
      isSameAddress:[false],
      city: [this.empBasic?.city],
      state: [this.empBasic?.state],
      presentAddress: [this.empBasic?.presentAddress, Validators.required],
      permanentAddress: [this.empBasic?.permanentAddress, Validators.required],
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
    designation: formData.value.desiganation, 
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
    presentAddress: formData.value.presentAddress, 
    permanentAddress:formData.value.permanentAddress,
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
     const presentA = this.empB1Form.get('presentAddress')?.value;
     this.empB1Form.patchValue({
       permanentAddress: presentA
     });
   } else {
     this.empB1Form.patchValue({
       permanentAddress: ''
     });
   }
   this.empB1Form.updateValueAndValidity();
}
   
}
