import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../student-details/student.service';



@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.scss']
})
export class EmpAddComponent {
  bloodGrList: any[] = [];
  genderList: any[] = [];
  religionList: any[] = [];
  acceptedFileTypes: string = '.csv';

  public files: NgxFileDropEntry[] = [];
  isLoading: boolean;
  fileData: any;
  fileDataCsv: any;

  startdateSelected: string;
  skipBankDetails: boolean = false;
  updateid: null;
  loginDeatils: boolean = false;
  checkedhouse: '';
  checkedstreet: any;
  checkedZipCode: any;
  cityChecked: any;
  masterValue: any;
  name: any;
  Paddress: any;
  Pstreet: any;
  street: any;
  inputValue: string;
  input1: string;
input2: string;
concatenatedValue: string;
  input3: string;
  input4: string;
  permanentAddrressChecked: any;
  Pinput1: string;
  Pinput2: string;
  Pinput3: string;
  Pinput4: string;
  concatenatedValueP: string;

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }



  employe_role = [
    { id: '1 ', value: 'Admin' },
    { id: '2', value: 'Teacher' },
    { id: '3', value: 'Accountant' },
    { id: '4', value: 'Librarian' },
    { id: '5', value: 'Receptionist' },

  ];
  csvForm: FormGroup

  addEmployee: FormGroup
  departments: any[] = [];
  designations: any[] = [];

  editEmploye: any;
  employeeId: string
  abc: any

  constructor(private api: ApiService, private toastr: ToastrService, private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,) {
    this.genderList = this.studentService.genderList;
    this.bloodGrList = this.studentService.bloodGrList;
    this.religionList = this.studentService.religionList;
    route.params.subscribe(param => {
      if (router.getCurrentNavigation()?.extras.state) {
        this.editEmploye = router.getCurrentNavigation()?.extras.state?.['data'];
        this.employeeId = this.editEmploye.employeeId;


        // this._setValue();
      }
    });




  }
  AddEmployeF: any
  _action = 'Save'
  Cancel_update: String
  buttonSave: boolean = false
  buttonUpdate: boolean = false

  ngOnInit(): void {
    console.log("yes");
    this.getDepartments()
    this.getDesignations()

    if(this.AddEmployeF || (this.editEmploye === null || this.editEmploye === undefined) ){
      this.AddEmloyeForm();
      this.multipleImForm()
      this.buttonSave = true;
      // this.getDepartments()
      // this.getDesignations() 
      this.buttonSave = true;
    } else {
      if(this.editEmploye.hasOwnProperty('_id')) {
        if(!this.AddEmployeF || this.editEmploye._id){
          console.log("not");
          
          this._setValue()
          this._action = 'Update'
          this.buttonUpdate = true
       
          this.Cancel_update = 'Cancel Update'
        }
      }
    }
/*
    if (this.AddEmployeF || this.editEmploye == null) {
      this.AddEmloyeForm()
      this.multipleImForm()
      this.buttonSave = true;
    }
    if (!this.AddEmployeF || this.editEmploye._id) {
      console.log("not");

      this._setValue()
      this._action = 'Update'
      this.buttonUpdate = true

      this.Cancel_update = 'Cancel Update'
    }
*/



  }


  multipleImForm() {
    if (!this.AddEmployeF || this.editEmploye._id) {
      this.csvForm = new FormGroup({
        designation: new FormControl('select', [Validators.required]),
        department: new FormControl('select', [Validators.required]),
      })
    }
  }
  AddEmloyeForm() {
    if (!this.AddEmployeF || this.editEmploye._id) {
      this.addEmployee = new FormGroup({
        employeeId: new FormControl(null, [Validators.required]),
        joiningDate: new FormControl(null, [Validators.required]),
        designation: new FormControl('select', [Validators.required]),
        department: new FormControl('select', [Validators.required]),

        qualification: new FormControl(null, [Validators.required]),
        experienceDetails: new FormControl(null, [Validators.required]),
        totalExperience: new FormControl(null, [Validators.required]),
        name: new FormControl(null, [Validators.required]),
        gender: new FormControl(null, [Validators.required]),
        bloodGroup: new FormControl(null, [Validators.required]),
        religion: new FormControl(null, [Validators.required]),
        dob: new FormControl(null, [Validators.required]),
        // number: new FormControl(null, [Validators.required]),
        number: new FormControl(['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]),

        email: new FormControl(null, [Validators.required]),

        presentAddress: new FormControl(null, [Validators.required]),
        permanentAddress: new FormControl(null, [Validators.required]),
        userName: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        facebook: new FormControl(null, [Validators.required]),
        twitter: new FormControl(null, [Validators.required]),
        linkedin: new FormControl(null, [Validators.required]),
        skipBankDetails: new FormControl(false, [Validators.required]),
        bankName: new FormControl(null, [Validators.required]),
        holderName: new FormControl(null,),
        bankBranch: new FormControl(null, [Validators.required]),
        bankAddress: new FormControl(null, [Validators.required]),
        ifscCode: new FormControl(null, [Validators.required]),
        accountNumber: new FormControl(null, [Validators.required]),
        abc: new FormControl(null, [Validators.required]),
        image: new FormControl(null, [Validators.required]),
        // 
     
 
       


      });

    }
    this.addEmployee = new FormGroup({

      joiningDate: new FormControl(null, [Validators.required]),
      designation: new FormControl('select', [Validators.required]),
      department: new FormControl('select', [Validators.required]),

      qualification: new FormControl(null, [Validators.required]),
      experienceDetails: new FormControl(null, [Validators.required]),
      totalExperience: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      bloodGroup: new FormControl(null, [Validators.required]),
      religion: new FormControl(null, [Validators.required]),
      dob: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      // city: new FormControl(null, [Validators.required]),
      // state: new FormControl(null, [Validators.required]),
      presentAddress: new FormControl(null, [Validators.required]),
      permanentAddress: new FormControl(null, [Validators.required]),
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      facebook: new FormControl(null, [Validators.required]),
      twitter: new FormControl(null, [Validators.required]),
      linkedin: new FormControl(null, [Validators.required]),
      skipBankDetails: new FormControl(false, [Validators.required]),
      bankName: new FormControl(null, [Validators.required]),
      holderName: new FormControl(null,),
      bankBranch: new FormControl(null, [Validators.required]),
      bankAddress: new FormControl(null, [Validators.required]),
      ifscCode: new FormControl(null, [Validators.required]),
      accountNumber: new FormControl(null, [Validators.required]),
      abc: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
// 
house_no: new FormControl(null, [Validators.required]),
Street: new FormControl(null, [Validators.required]),
zipcode: new FormControl(null, [Validators.required]),
city: new FormControl(null, [Validators.required]),

    });
  }

  getDesignations() {
    this.api.getDesignations().subscribe(resp => {
      console.log(resp);

      this.designations = resp.designations
    });
  }
  getDepartments() {
    this.api.getDepartments().subscribe(resp => {
      this.departments = resp.departments
      console.log(this
        .departments);

    });
  }


  skipDetail(event: any) {

    console.log(event.checked);

    if (event.checked) {
      this.skipBankDetails = true;
    }
    else {
      this.skipBankDetails = false
    }

  }

  onFilesDropped(files: NgxFileDropEntry[]) {
    console.log(files);
    if (files.length > 1) {
      alert('Please upload a single file');
    }
    else {
      for (const droppedFile of files) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.fileData = file;
          })
        }
      }
    }
  }
  // for csv
  onFilesDroppedCsv(files: NgxFileDropEntry[]) {
    console.log(files);
    if (files.length > 1) {
      alert('Please upload a single file');
    }
    else {
      for (const droppedFile of files) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.fileDataCsv = file;
          })
        }
      }
    }
  }
  multipleImportCsv() {
    let postData = new FormData();

    postData.append("desiganation", this.csvForm.value.designation);
    postData.append("department", this.csvForm.value.department);
    if (this.fileDataCsv) {
      postData.append("file", this.fileDataCsv);
    }

    console.log(postData);
    this.api.uploadCSVEmploye(postData).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, "Multiple Import success");
      this.fileData = null;
      this.csvForm.reset()


    },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, " Multiple Import failed");
      })
  }
  addEmployees() {
    //  Create a new date object
    let joiningDate: Date = new Date();

    let result: string = joiningDate.toLocaleString();

    result = joiningDate.toLocaleString("en-US");
    let dob: Date = new Date();

    let result2: string = dob.toLocaleString();

    result2 = dob.toLocaleString("en-US");
    console.log(this.addEmployee.value.house_no);
    console.log( this.addEmployee.value.qualification);
    console.log( this.addEmployee.value.permanentAddress);

    console.log(this.concatenatedValue);
    
    
    let postData = new FormData();
    postData.append("joiningDate", this.addEmployee.value.joiningDate);
    postData.append("dob", this.addEmployee.value.dob);
    postData.append("qualification", this.addEmployee.value.qualification);
    postData.append("experienceDetails", this.addEmployee.value.experienceDetails);
    postData.append("totalExperience", this.addEmployee.value.totalExperience);
    postData.append("name", this.addEmployee.value.name);
    postData.append("gender", this.addEmployee.value.gender);
    postData.append("bloodGroup", this.addEmployee.value.bloodGroup);
    postData.append("religion", this.addEmployee.value.religion);
    postData.append("number", this.addEmployee.value.number);
    postData.append("email", this.addEmployee.value.email);
    // postData.append("presentAddress", this.addEmployee.value.presentAddress);
    postData.append("presentAddress", this.concatenatedValue);
    postData.append("permanentAddress", this.addEmployee.value.permanentAddress);
    postData.append("userName", this.addEmployee.value.userName);
    postData.append("password", this.addEmployee.value.password);
    postData.append("facebook", this.addEmployee.value.facebook);
    postData.append("twitter", this.addEmployee.value.twitter);
    postData.append("linkedin", this.addEmployee.value.linkedin);
    postData.append("skipBankDetails", this.addEmployee.value.skipBankDetails);
    postData.append("bankName", this.addEmployee.value.bankName);
    postData.append("holderName", this.addEmployee.value.holderName);
    postData.append("bankBranch", this.addEmployee.value.bankBranch);
    postData.append("bankAddress", this.addEmployee.value.bankAddress);
    postData.append("ifscCode", this.addEmployee.value.ifscCode);
    postData.append("accountNumber", this.addEmployee.value.accountNumber);
    postData.append("designation", this.addEmployee.value.designation);
    postData.append("department", this.addEmployee.value.department);
    postData.append("employeeId", this.addEmployee.value.employeeId);
    postData.append("image", this.addEmployee.value.image);


    if (this.fileData) {
      postData.append("file", this.fileData);
    }
    this.startdateSelected = moment(this.addEmployee.value.start_date).format(
      'MM/DD/YYYY'
    );

    console.log(postData);
    this.api.addEmpployee(postData).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;
      this.toastr.success(resp.message, "Add Employee  success");
      this.fileData = null;


    },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, " add failed");
      })
  }

  update() {

    this.isLoading = true;
    console.log(this
      .employeeId);

    this.api.updateEmpployee(this.addEmployee.value).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, " update success");
      this.router.navigate(['/employee/list'])
    },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, " update failed");
      });


  }

  _setValue() {
    console.log(this.employeeId);
    this.employeeId;


    this.addEmployee = new FormGroup({

      employeeId: new FormControl(this.editEmploye._id, [Validators.required]),
      // role: new FormControl(this.editEmploye.role, [Validators.required]),
      joiningDate: new FormControl(this.editEmploye.joiningDate, [Validators.required]),
      designation: new FormControl(this.editEmploye.designation._id, [Validators.required]),
      department: new FormControl(this.editEmploye.department._id, [Validators.required]),
      qualification: new FormControl(this.editEmploye.qualification, [Validators.required]),
      experienceDetails: new FormControl(this.editEmploye.experienceDetails, [Validators.required]),
      totalExperience: new FormControl(this.editEmploye.totalExperience, [Validators.required]),
      name: new FormControl(this.editEmploye.name, [Validators.required]),
      gender: new FormControl(this.editEmploye.gender, [Validators.required]),
      bloodGroup: new FormControl(this.editEmploye.bloodGroup, [Validators.required]),
      religion: new FormControl(this.editEmploye.religion, [Validators.required]),
      dob: new FormControl(this.editEmploye.dob, [Validators.required]),
      number: new FormControl(this.editEmploye.number, [Validators.required]),
      email: new FormControl(this.editEmploye.email, [Validators.required]),
      presentAddress: new FormControl(this.editEmploye.presentAddress, [Validators.required]),
      permanentAddress: new FormControl(this.editEmploye.permanentAddress, [Validators.required]),
      userName: new FormControl(this.editEmploye.userName, [Validators.required]),
      password: new FormControl(this.editEmploye.password, [Validators.required]),
      facebook: new FormControl(this.editEmploye.facebook, [Validators.required]),
      twitter: new FormControl(this.editEmploye.twitter, [Validators.required]),
      linkedin: new FormControl(this.editEmploye.linkedin, [Validators.required]),
      skipBankDetails: new FormControl(this.editEmploye.skipBankDetails, [Validators.required]),
      bankName: new FormControl(this.editEmploye.bankName, [Validators.required]),
      holderName: new FormControl(this.editEmploye.holderName,),
      bankBranch: new FormControl(this.editEmploye.bankBranch, [Validators.required]),
      bankAddress: new FormControl(this.editEmploye.bankAddress, [Validators.required]),
      ifscCode: new FormControl(this.editEmploye.ifscCode, [Validators.required]),
      accountNumber: new FormControl(this.editEmploye.accountNumber, [Validators.required]),

    });

  }

  DisableDetails(event: any) {
    console.log(event);

    console.log(event);
    if (event.target.option) {
      console.log("inside if");

      this.loginDeatils = true
    } else {
      this.loginDeatils = false
    }

  }

  cancel() {
    this.router.navigate(['/employee/add'])
  }

  deleteEmploye() {
  //     this.isLoading = true;
  //     this.api.deleteLeaveRequest(this.selectedLeave._id).subscribe(resp => {
  //       console.log(resp);
  //       this.isLoading = false;
  //       document.getElementById('modalDismissBtn')?.click();
  //       this.getLeaveApplication();
  //     },
  //     (err) => {
  //       this.isLoading = false;
  //       console.error(err);
  //     })
  }

  updateFourthField() {
    this.concatenatedValue = this.input1 + ', ' + this.input2 + ' ,' +this.input3+ ',' + this.input4 ;


  }
  updateFourthFieldP(){
    this.concatenatedValueP = this.Pinput1 + ', ' + this.Pinput2 + ' ,' +this.Pinput3+ ',' + this.Pinput4 ;


  }
  onKeyPress(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (target.tagName === 'INPUT') {
       this.inputValue = target.value;
      console.log('Input value:', this.inputValue);
      // Additional logic...
    }
  }
  onInputChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.tagName === 'INPUT') {
      this.inputValue = target.value;
      console.log('Input value:', this.inputValue);
      // Additional logic...
    }
  }
  
  
  getVAlue(event){
    console.log(event.checked);
    if(event.checked==true){
      this.checkedhouse = this.addEmployee.value.house_no
      this.checkedstreet=this.addEmployee.value.Street
      this.checkedZipCode = this.addEmployee.value.zipcode
      this.cityChecked = this.addEmployee.value.city
      this.permanentAddrressChecked = this.concatenatedValue
    }
    if(event.checked ==false ){
      this.checkedhouse = ''
      this.checkedstreet = ''
      this.checkedZipCode = ''
      this.cityChecked = ''
      this.permanentAddrressChecked  = ''


    }
  
  
let data= {
  houseNo:  this.addEmployee.value.house_no,
  Street:  this.addEmployee.value.Street
} 
console.log(data);


  this.masterValue = data.Street 
  console.log(this.masterValue);
  


  }
  changeName(name){
    console.log(name);
    this.Paddress = name
   
  }
  
}