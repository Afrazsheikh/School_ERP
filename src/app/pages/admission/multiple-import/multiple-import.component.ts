import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService } from '../../student-details/student.service';

@Component({
  selector: 'app-multiple-import',
  templateUrl: './multiple-import.component.html',
  styleUrls: ['./multiple-import.component.scss']
})
export class MultipleImportComponent {
  aceYear = [];

  myFiles:string [] = [];
  // myFiles:any
  classes: any[] = [];
  sections: any[] = [];

  myForm: FormGroup
  image: any;
   Mfiles: NgxFileDropEntry[] = []
  isLoading: boolean;
  selectedFiles: any[];
  file: any;
  fileData: any;


  acceptedFileTypes: string = '.csv';
  
  constructor(private http: HttpClient, private api: ApiService, private toastr: ToastrService, private router: Router,private studentService:StudentService) {

   this. myForm = new FormGroup({
    studentClass: new FormControl('', [Validators.required]),
    section: new FormControl('', [Validators.required]),
    academicYear: new FormControl('', [Validators.required])
    });
    this.aceYear = this.studentService.aceYear;
   }

   

   ngOnInit(): void {
    this.getAllClass()

  }

submit(){ 

  const postData = new FormData();
  postData.append("studentClass", this.myForm.value.studentClass);
  postData.append("section", this.myForm.value.section);
  postData.append("academicYear", this.myForm.value.academicYear);


  // for (var i = 0; i < this.myFiles.length; i++) { 
  //   formData.append("file[]", this.myFiles[i]);
  // }
  if(this.fileData) {
    postData.append("file", this.fileData);
  }
  console.log(this.file);
  

this.api.uploadCSV(postData).subscribe(resp => {
  console.log(resp);
  this.isLoading = false;
  this.toastr.success(resp.message, "Multiple uploaded strongly ");
  this.myForm.reset()

},
(err) => {
  this.isLoading = false;
  this.toastr.error(err, " add failed");
  console.error(err);
})
}


dropped(files: NgxFileDropEntry[]){
  console.log(files);
  
// this.Mfiles =files

// if(files.length > 1) {
//   alert('Please upload a single file');
// // }
// else
// {
  for(const droppedFile of files) {
    console.log(droppedFile);
    
    // if(droppedFile.fileEntry.isFile)
    // {

    //   const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    //   fileEntry.file((file: File) => {
    //     if(imgType == 'image') {
    //       this.image = file;
    //     }
       
       
    //   })
    // }
  // }
}

console.log("this.Mfiles", this.Mfiles);

}



getAllClass() {
  this.api.getAllClass().subscribe(resp => {
    console.log(resp);
    this.classes = resp.classes
  });
}


onChangeClass(event){
  this.sections =[];
  this.myForm.patchValue({section: 'select'});
  const id = event.target.value;
  this.classes.forEach(element => {
      if(element._id === id) {
        this.sections = element.sections;
      }
  });
}

onFilesDropped(files: NgxFileDropEntry[])
  {
    console.log(files);
    if(files.length > 1) {
      alert('Please upload a single file');
    }
    else
    {
      for(const droppedFile of files) {
        if(droppedFile.fileEntry.isFile)
        {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.fileData = file;
          })
        }
      }
    }
  }

}
