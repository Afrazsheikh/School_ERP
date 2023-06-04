import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService } from '../../student-details/student.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { SelectDropDownService } from "ngx-select-dropdown";
import * as moment from 'moment';
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
  image: any;
  idCardDocument: any;
  GuardianImage: any;
  guardianProf: any;
  singleSelect: any = [];
  config = {
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
  guadianList: any[] = [];
  options:any[] = [];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder,
    private drodownService: SelectDropDownService, private studentService:StudentService) {
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
    this.getAllCateogy();
    this.getGuardenList();
    this.createForm();
  }       
    
  getGuardenList() {
    this.api.getGuardianAll().subscribe(resp => {
      this.guadianList = resp.guardians;
      this.options = this.guadianList;
    });
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
      section: ['', Validators.required],
      category: ['', Validators.required],
      registerNo: ['VXPIS'],
      rollNo: ['', Validators.required],
      admissionDate: ['', Validators.required],
      type: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      dob: ['', Validators.required],
      motherTongue: ['', Validators.required],
      religion: ['', Validators.required],
      caste: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      previousQualification: ['', Validators.required],
      previousSchoolName: ['', Validators.required],
      isGuardianExist: [false],
      guardian: this.fb.group({
        name: ['', Validators.required],
        relation: ['', Validators.required],
        fatherName: ['', Validators.required],
        motherName: ['', Validators.required],
        occupation: ['', Validators.required],
        education: ['', Validators.required],
        mobileNumber: ['', Validators.required],
        email: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        permanentAddress: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', Validators.required],
        alreadyExists: [true]
      }),
      presentAddress: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      
      presentAddressZipCode: new FormControl(null, [Validators.required]),
      presentAddressHouseNo: new FormControl(null, [Validators.required]),
      presentAddressStreet: new FormControl(null, [Validators.required]),
      presentAddressCity: new FormControl(null, [Validators.required]),
      presentAddressState: new FormControl(null, [Validators.required]),
      premanentAddressHouseNo: new FormControl(null,  [Validators.required]),
      premanentAddressStreet: new FormControl(null, [Validators.required]),
      premanentAddressZipCode: new FormControl(null, [Validators.required]),
      premanentAddressCity: new FormControl(null, [Validators.required]),
      premanentAddressState: new FormControl(null, [Validators.required]),
    });
  }
  selectedGua(event) {
    const data = event.value;
    this.studentForm.controls['guardian'].patchValue({
      name: data.firstName,
      relation: data.relation,
      fatherName: data.fatherName,
      motherName: data.motherName,
      occupation: data.occupation,
      mobileNumber: data.number,
      email: data.email,
      city: data.city,
      state: data.state,
      permanentAddress: data.permanentAddress,
      userName: data.userName,
      password: data.password,
      alreadyExists: data.alreadyExists,
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
    const gauValue = _form.value.guardian;
    const guardianArr = {
      firstName: gauValue.name,
      relation: gauValue.relation,
      fatherName: gauValue.fatherName,
      motherName: gauValue.motherName,
      occupation: gauValue.occupation,
      number: gauValue.mobileNumber,
      email: gauValue.email,
      city: gauValue.city,
      state: gauValue.state,
      permanentAddress: gauValue.permanentAddress,
      userName: gauValue.userName,
      password: gauValue.password,
      image: this.GuardianImage,
      idProofDocument: this.guardianProf,
      alreadyExists: gauValue.alreadyExists
    }
    let postData = new FormData();

    postData.append("academicYear", _form.value.academicYear);
    postData.append("section", _form.value.section);
    postData.append("category", _form.value.category);
    postData.append("studentClass", _form.value.studentClass);
    postData.append("registerNo", _form.value.registerNo);
    // postData.append("admissionDate", _form.value.admissionDate);
    postData.append("admissionDate", moment(_form.value.admissionDate).format("YYYY-MM-DD"));
    postData.append("firstName", _form.value.firstName);
    postData.append("rollNo", _form.value.rollNo);

    postData.append("type", _form.value.type);
    // postData.append("dob", _form.value.dob);
    postData.append("dob", moment(_form.value.dob).format("YYYY-MM-DD"));

    postData.append("number", _form.value.mobileNumber);
    postData.append("email", _form.value.email);
    postData.append("lastName", _form.value.lastName);
    postData.append("gender", _form.value.gender);
    postData.append("bloodGroup", _form.value.bloodGroup);
    postData.append("motherTongue", _form.value.motherTongue);
    postData.append("religion", _form.value.religion);
    postData.append("caste", _form.value.caste);
    postData.append("city", _form.value.city);
    postData.append("state", _form.value.state);
    postData.append("presentAddress", _form.value.presentAddress);
    postData.append("permanentAddress", _form.value.permanentAddress);

    postData.append("guardian[previousSchoolName]", _form.value.previousSchoolName);
    postData.append("guardian[previousQualification]", _form.value.previousQualification);
    postData.append("guardian[userName]", guardianArr.userName);
    postData.append("guardian[password]", guardianArr.password);
    postData.append("guardian[firstName]", guardianArr.firstName);
    postData.append("guardian[relation]", guardianArr.relation);
    postData.append("guardian[fatherName]", guardianArr.fatherName);
    postData.append("guardian[motherName]", guardianArr.motherName);
    postData.append("guardian[alreadyExists]", guardianArr.alreadyExists);
    postData.append("guardian[occupation]", guardianArr.occupation);
    postData.append("guardian[number]", guardianArr.number);
    postData.append("guardian[email]", guardianArr.email);
    postData.append("guardian[city]", guardianArr.city);
    postData.append("guardian[state]", guardianArr.state);
    postData.append("guardian[permanentAddress]", guardianArr.permanentAddress);

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
      this.router.navigate(['/student-details/student-list']);
    },
      (err) => {
        this.toastr.error(err, " add failed");
        console.error(err);
      })
  }
  onBlurEmail() {  
    const password = this.generatePassword();
    const username =  this.studentForm.controls['guardian'].get('email')?.value;
    this.studentForm.controls['guardian'].patchValue({ userName: username, password: password });
    this.studentForm.updateValueAndValidity();
  }
 
  searchChange($event) {
    console.log($event);
  }
  generatePassword() {
    return (Math.random().toString(36).slice(-8));
  }
  onBlurCopyAddre(event){
    if(event.checked == true){
    const presentAddressHouseNo = this.studentForm.controls['presentAddressHouseNo'].value;
    const presentAddressZipCode = this.studentForm.controls['presentAddressZipCode'].value;
    const presentAddressStreet = this.studentForm.controls['presentAddressStreet'].value;
    const presentAddressCity = this.studentForm.controls['presentAddressCity'].value;
    const presentAddressState = this.studentForm.controls['presentAddressState'].value;
    this.studentForm.patchValue({ premanentAddressHouseNo: presentAddressHouseNo, premanentAddressStreet: presentAddressStreet, premanentAddressZipCode: presentAddressZipCode, premanentAddressCity :presentAddressCity, premanentAddressState: presentAddressState });

  }
  if(event.checked ==false ){
    this.studentForm.patchValue({ premanentAddressHouseNo: "", premanentAddressStreet: '', premanentAddressZipCode: '', premanentAddressCity :'' ,});
   
  }
  }
}