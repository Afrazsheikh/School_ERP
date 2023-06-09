import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentService } from '../../student-details/student.service';
import * as moment from 'moment';


@Component({
  selector: 'app-create-emp',
  templateUrl: './create-emp.component.html',
  styleUrls: ['./create-emp.component.scss']
})
export class CreateEmpComponent {
  empB1Form: FormGroup;
  empBasic: any;
  bloodGrList: any[] = [];
  genderList: any[] = [];
  religionList: any[] = [];
  departments: any[] = [];
  designations: any[] = [];
  selectedDesgingation:any[] = [];
  address = { 'present': [], 'permanent': [] };
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router, public fb: FormBuilder, private studentService: StudentService) {
    this.genderList = this.studentService.genderList;
    this.bloodGrList = this.studentService.bloodGrList;
    this.religionList = this.studentService.religionList;
  }
  ngOnInit() {
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
      this.designations = resp.designations;
    });
  }
  createFrom() {
    if (this.empBasic?.joiningDate !== '' && this.empBasic?.joiningDate !== null && this.empBasic?.joiningDate !== undefined) {
      this.empBasic.joiningDate = new Date(this.empBasic.joiningDate);
    }
    if (this.empBasic?.dob !== '' && this.empBasic?.dob !== null && this.empBasic?.dob !== undefined) {
      this.empBasic.dob = new Date(this.empBasic.dob);
    }

    this.empB1Form = this.fb.group({
      department: ['', Validators.required],
      designation: ['', Validators.required],
      joiningDate: ['', Validators.required],
      qualification: ['', Validators.required],
      experienceDetails: ['', Validators.required],
      totalExperience: ['', Validators.required],
      gender: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      religion: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', Validators.required],
      presentAddressHouseNo: ['', Validators.required],
      presentAddressStreet: ['', Validators.required],
      presentAddressZipCode: ['', Validators.required],
      presentAddressState: ['', Validators.required],
      presentAddressCity: ['', Validators.required],
      permanentAddressHouseNo: ['', Validators.required],
      permanentAddressStreet: ['', Validators.required],
      permanentAddressZipCode: ['', Validators.required],
      permanentAddressCity: ['', Validators.required],
      permanentAddressState: ['', Validators.required],
      isSameAddress: [false],
      facebook: [''],
      twitter: [''],
      linkedin: [''],
      userName: [''],
      password: [''],
      bankName: [''],
      holderName: [''],
      bankBranch: [''],
      bankAddress: [''],
      ifscCode: [''],
      accountNumber: [''],
      skipBankDetails: [false]
    });
  }

  createInfo(formData) {
    const payload = {
      designation: formData.value.designation,
      department: formData.value.department,
      joiningDate: moment(formData.value.joiningDate).format('MM/DD/YYYY'),
      qualification: formData.value.qualification,
      experienceDetails: formData.value.experienceDetails,
      totalExperience: formData.value.totalExperience,
      name: formData.value.name,
      gender: formData.value.gender,
      bloodGroup: formData.value.bloodGroup,
      religion: formData.value.religion,
      dob: moment(formData.value.dob).format('MM/DD/YYYY'),
      number: formData.value.number,
      email: formData.value.email,
      city: formData.value.city,
      state: formData.value.state,
      presentAddressHouseNo: formData.value.presentAddressHouseNo,
      presentAddressStreet: formData.value.presentAddressStreet,
      presentAddressZipCode: formData.value.presentAddressZipCode,
      presentAddressCity: formData.value.presentAddressCity,
      presentAddressState: formData.value.presentAddressState,
      premanentAddressHouseNo: formData.value.permanentAddressHouseNo,
      premanentAddressStreet: formData.value.permanentAddressStreet,
      premanentAddressZipCode: formData.value.permanentAddressZipCode,
      premanentAddressCity: formData.value.permanentAddressCity,
      premanentAddressState: formData.value.permanentAddressState,
      userName: formData.value.userName,
      password: formData.value.password,
      facebook: formData.value.facebook,
      twitter: formData.value.twitter,
      linkedin: formData.value.linkedin,
      bankName: formData.value.bankName,
      holderName: formData.value.holderName,
      bankBranch: formData.value.bankBranch,
      bankAddress: formData.value.bankAddress,
      ifscCode: formData.value.ifscCode,
      accountNumber: formData.value.accountNumber
    }
    console.log(payload);
    console.log(formData);
    this.api.addEmpployee(payload).subscribe(resp => {
      this.toastr.success(resp?.message, "Added Successfully");
      this.empB1Form.reset();
    },
      (err) => {
        this.toastr.error(err, " Added failed");
      });

  }
  updatePermenentAdd() {
    var presentA = ''; var housno = ''; var aprtment = ''; var landmark = ''; var zipcode = '';

    if (!this.api.isEmptyObject(this.empB1Form.get('houseNo')?.value)) {
      housno = this.empB1Form.get('houseNo')?.value;
    }
    if (!this.api.isEmptyObject(this.empB1Form.get('apartment')?.value)) {
      aprtment = ", " + this.empB1Form.get('apartment')?.value;
    }
    if (!this.api.isEmptyObject(this.empB1Form.get('landmark')?.value)) {
      landmark = ", " + this.empB1Form.get('landmark')?.value;
    }
    if (!this.api.isEmptyObject(this.empB1Form.get('zipcode')?.value)) {
      zipcode = ", " + this.empB1Form.get('zipcode')?.value;
    }
    presentA = housno + aprtment + landmark + zipcode;
    this.empB1Form.patchValue({
      presentAddress: presentA
    });
    this.empB1Form.updateValueAndValidity();
  }
  updatePersentAdd() {
    var presentA = ''; var housno = ''; var aprtment = ''; var landmark = ''; var zipcode = '';

    if (!this.api.isEmptyObject(this.empB1Form.get('houseNo1')?.value)) {
      housno = this.empB1Form.get('houseNo1')?.value;
    }
    if (!this.api.isEmptyObject(this.empB1Form.get('apartment1')?.value)) {
      aprtment = ", " + this.empB1Form.get('apartment1')?.value;
    }
    if (!this.api.isEmptyObject(this.empB1Form.get('landmark1')?.value)) {
      landmark = ", " + this.empB1Form.get('landmark1')?.value;
    }
    if (!this.api.isEmptyObject(this.empB1Form.get('zipcode1')?.value)) {
      zipcode = ", " + this.empB1Form.get('zipcode1')?.value;
    }
    presentA = housno + aprtment + landmark + zipcode;
    this.empB1Form.patchValue({
      permanentAddress: presentA
    });
    this.empB1Form.updateValueAndValidity();
  }
  getVAlue(event) {
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
  onBlurEmail() {
    const password = this.generatePassword();
    const username = this.empB1Form.get('email')?.value;
    this.empB1Form.patchValue({
      userName: username,
      password: password
    });
    this.empB1Form.updateValueAndValidity();
  }
  generatePassword() {
    return (Math.random().toString(36).slice(-8));
  }
  onChangeDepart(event) {
    this.selectedDesgingation =[];
     this.empB1Form.patchValue({ designation: 'select' });
     const id = event.target.value;
     this.designations.forEach(element => {
       if ( element?.department?._id === id) {
         this.selectedDesgingation.push(element) ;
       }
     });    
   }
}
