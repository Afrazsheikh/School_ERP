import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService } from '../../student-details/student.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { SelectDropDownService } from "ngx-select-dropdown";
import * as moment from 'moment';
import { MatCheckbox } from '@angular/material/checkbox';
@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent {
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
  guardinList:any[] =[];
  stateList:any[] = [];
  image: any;
  idCardDocument: any;
  GuardianImage: any;
  guardianProf: any;
  singleSelect: any = [];
  config = {
    //displayFn:(item: any) => { return item?.guardian?.userName; },
    displayKey: "userName",
    height: "250px",
    search: true,
    placeholder: "Select",
    searchPlaceholder: "Search...",
    limitTo: 0,
    customComparator: undefined,
    noResultsFound: "No results found!",
    moreText: "more",
    searchOnKey: "userName",
    clearOnSelection: false,
    inputDirection: "ltr",
    selectAllLabel: "Select all",
    enableSelectAll: false
  }
  emailPattern =  '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  guadianList: any[] = [];
  options:any[] = [];
  @ViewChild('guardian2PrimaryGuard') private guardian2PrimaryGuard: MatCheckbox;
  @ViewChild('guardian1PrimaryGuard') private guardian1PrimaryGuard: MatCheckbox;
  isRequiredSign:boolean=false;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder,
    private drodownService: SelectDropDownService, private studentService:StudentService) {
    this.aceYear = this.studentService.aceYear;
    this.genderList = this.studentService.genderList;
    this.bloodGrList = this.studentService.bloodGrList;
    this.religionList = this.studentService.religionList;
    this.motherToungLanList = this.studentService.language;
    this.castList = this.studentService.castList;
   // this.typeList = this.studentService.typeList;
    this.relationShipList = this.studentService.relationShipList;
    this.occupationsList = this.studentService.occupationsList;
    this.educationList = this.studentService.educationList;
    this.stateList = this.studentService.indiaStateList;
    
  }
  ngOnInit() {
    this.getAllClass();
    this.getAllCateogy();
    this.getTypeList();
    this.getGuardenList();
    this.createForm();
  }       
    
  getGuardenList() {
    this.api.getGuardianAll().subscribe(resp => {
      this.guadianList =resp.guardians;
      
      this.guadianList.forEach(element => {
        this.options.push({
          userName: element.guardian?.userName +" "+"("+element.guardian?.firstName+")",
          guardian:element?.guardian,
          guardian2:element?.guardian2
        });
      });
      
    });
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
  getAllCateogy() {
    this.api.getCategory().subscribe(data => {
      this.categoryData = data.categories;
    });
  }
  onChangeClass(event) {
    this.sections = [];
    this.studentForm.patchValue({ section: 'select' });
    const id = event.target.value;
    this.classes.forEach(element => {
      if (element._id === id) {
        this.sections = element.sections;
      }
    });
  }
  createForm() {
    this.studentForm = this.fb.group({
      id: [''],
      academicYear: ['', Validators.required],
      studentClass: ['', Validators.required],
      section: [''],
      category: ['', Validators.required],
      registerNo: ['VXPIS'],
      rollNo: [''],
      admissionDate: [new Date(), Validators.required],
      type: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      dob: ['', Validators.required],
      motherTongue: ['', Validators.required],
      religion: ['', Validators.required],
      caste: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      presentAddressHouseNo: ['',Validators.required],
      presentAddressStreet: ['', Validators.required],
      presentAddressZipCode: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{5}$")]],
      presentAddressState: ['', Validators.required],
      presentAddressCity: ['', Validators.required],    
      permanentAddressHouseNo: ['', Validators.required],
      permanentAddressStreet: ['', Validators.required],
      permanentAddressZipCode: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{5}$")]],
      permanentAddressCity: ['', Validators.required],
      permanentAddressState:['', Validators.required],
      previousQualification: [''],
      previousSchoolName: [''],
      isSameAddress:[false],
      isGuardianExist: [false],
      alreadyExists: [false],
      guardian1:this.fb.group({
        relation: ['', Validators.required],
        setAsPrimaryGuradian:[false,Validators.required],
        fullName: ['', Validators.required],
        mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        occupation: ['', Validators.required],
      }),
      guardian2:this.fb.group({
        relation: [''],
        setAsPrimaryGuradian:[false],
        fullName: [''],
        mobileNumber: ['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        email: ['',[Validators.pattern(this.emailPattern)]],
        occupation: [''],
      }),
      // permanentAddress: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  selectedGua(event) {
    const data = event.value;
    this.studentForm.controls['guardian1'].patchValue({
      relation:data.guardian?.relation,
      setAsPrimaryGuradian:data.guardian?.isPrimary,
      fullName:data.guardian?.firstName,
      mobileNumber:data.guardian?.number,
      email:data.guardian?.email,
      occupation:data.guardian?.occupation,     
    });
    this.studentForm.patchValue({
      userName:data.guardian?.userName,
      password:data.guardian?.password
    });
    this.studentForm.controls['guardian2'].patchValue({
      relation:data.guardian2?.relation,
      setAsPrimaryGuradian:data.guardian2?.isPrimary,
      fullName:data.guardian2?.firstName,
      mobileNumber:data.guardian2?.number,
      email:data.guardian2?.email,
      occupation:data.guardian2?.occupation
    });

    this.studentForm.updateValueAndValidity();
  }
  onFilesDropped(files: NgxFileDropEntry[], imgType: string) {
    console.log(files);
    if (files.length > 1) {
      alert('Please upload a single file');
    }
    else {
      for (const droppedFile of files) {
        if (droppedFile.fileEntry.isFile) {

          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            if (imgType == 'image') {
              this.image = file;
            }
            else if (imgType == 'idCardDocument') {
              this.idCardDocument = file;
            }
            else if (imgType == 'GuardianImage') {
              this.GuardianImage = file;
            }
            else if (imgType == 'guardianProf') {
              this.guardianProf = file;
            }

          })
        }
      }
    }
  }
  createInfo(_form) {
    
    const gauValue1 = _form.value.guardian1;
    const gauValue2 = _form.value.guardian2;
    const guardianArr1 = {
      userName:_form.value.userName,
      password:_form.value.password,
      firstName: gauValue1.fullName,
      relation: gauValue1.relation,
      alreadyExists:_form.value.alreadyExists,
      occupation:gauValue1.occupation,
      number: gauValue1.mobileNumber,
      email: gauValue1.email,
      setAsPrimaryGuradian: gauValue1.setAsPrimaryGuradian,
    }
    const guardianArr2 = {
      relation: gauValue2.relation,
      setAsPrimaryGuradian: gauValue2.setAsPrimaryGuradian,
      firstName: gauValue2.fullName,
      number: gauValue2.mobileNumber,
      email: gauValue2.email,
      occupation:gauValue2.occupation,
    }
    let postData = new FormData();

    postData.append("academicYear", _form.value.academicYear);
    postData.append("section", _form.value.studentClass?.sections[0]?._id);
    postData.append("category", _form.value.category);
    postData.append("studentClass", _form.value.studentClass?._id);
    postData.append("registerNo", _form.value.registerNo);
   // postData.append("rollNo", _form.value.rollNo);
    postData.append("admissionDate", moment(_form.value.admissionDate).format("YYYY-MM-DD"));
    postData.append("firstName", _form.value.firstName);
    postData.append("type", _form.value.type);
    postData.append("dob", moment(_form.value.dob).format("YYYY-MM-DD"));
    postData.append("number", _form.value.mobileNumber);
    postData.append("email", _form.value.email);
    postData.append("lastName", _form.value.lastName);
    postData.append("gender", _form.value.gender);
    postData.append("bloodGroup", _form.value.bloodGroup);
    postData.append("motherTongue", _form.value.motherTongue);
    postData.append("religion", _form.value.religion);
    postData.append("caste", _form.value.caste);
    postData.append("previousSchoolName", _form.value.previousSchoolName);
    postData.append("previousQualification", _form.value.previousQualification);
    postData.append("guardian[userName]", guardianArr1.userName);
    postData.append("guardian[password]", guardianArr1.password);
    postData.append("guardian[firstName]", guardianArr1.firstName);
    postData.append("guardian[relation]", guardianArr1.relation);
    postData.append("guardian[alreadyExists]", guardianArr1.alreadyExists);
    postData.append("guardian[occupation]", guardianArr1.occupation);
    postData.append("guardian[number]", guardianArr1.number);
    postData.append("guardian[email]", guardianArr1.email);
   // postData.append("guardian1[setAsPrimaryGuradian]", guardianArr1.setAsPrimaryGuradian);
    postData.append("guardian1[relation]", guardianArr2.relation);
    postData.append("guardian1[firstName]", guardianArr2.firstName);
    postData.append("guardian1[number]", guardianArr2.number);
    postData.append("guardian1[email]", guardianArr2.email);
    postData.append("guardian1[occupation]", guardianArr2.occupation);
    //postData.append("guardian2[setAsPrimaryGuradian]", guardianArr2.setAsPrimaryGuradian);
    postData.append("presentAddressCity", _form.value.presentAddressCity);
    postData.append("presentAddressState", _form.value.presentAddressState);
    postData.append("presentAddressHouseNo", _form.value.presentAddressHouseNo);
    postData.append("presentAddressStreet", _form.value.presentAddressStreet);
    postData.append("presentAddressZipCode", _form.value.presentAddressZipCode);
    postData.append("premanentAddressCity", _form.value.permanentAddressCity);
    postData.append("premanentAddressState", _form.value.permanentAddressState);
    postData.append("premanentAddressHouseNo", _form.value.permanentAddressHouseNo);
    postData.append("premanentAddressStreet", _form.value.permanentAddressStreet);
    postData.append("premanentAddressZipCode", _form.value.permanentAddressZipCode);

    if (this.image) {
      postData.append("image", this.image);
    }
    if (this.idCardDocument) {
      postData.append("idCardDocument", this.idCardDocument);
    }
    if (this.GuardianImage) {
      postData.append("guardian.image", this.GuardianImage);
    }
    if (this.guardianProf) {
      postData.append("guardian.idProofDocument", this.guardianProf);
    }
    this.api.addAdmission(postData).subscribe(resp => {
      this.toastr.success(resp.message, "Addmission add success");
      this.router.navigate(['/student-details/student-view/'+ resp?.student?._id]);
    },
      (err) => {
        this.toastr.error(err, " add failed");
        console.error(err);
      })
      
  }
  onBlurEmail() {  
    const password = this.generatePassword();
    const username =  this.studentForm.get('guardian1.email').value;
    this.studentForm.patchValue({ userName: username, password: password });
    this.studentForm.updateValueAndValidity();
  }
 
  searchChange($event) {
    console.log($event);
  }
  generatePassword() {
    return (Math.random().toString(36).slice(-8));
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
        permanentAddressHouseNo: '',
        permanentAddressStreet:'',
        permanentAddressZipCode:'',
        permanentAddressCity:'',
        permanentAddressState:''
  
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