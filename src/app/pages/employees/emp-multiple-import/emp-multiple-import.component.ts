import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService } from '../../student-details/student.service';
@Component({
  selector: 'app-emp-multiple-import',
  templateUrl: './emp-multiple-import.component.html',
  styleUrls: ['./emp-multiple-import.component.scss']
})
export class EmpMultipleImportComponent {
  aceYear = [];

  myFiles:string [] = [];
  // myFiles:any
  classes: any[] = [];
  sections: any[] = [];
  designations: any[] = [];
  departments: any[] = [];

  csvForm: FormGroup
  image: any;
   Mfiles: NgxFileDropEntry[] = []
  isLoading: boolean;
  selectedFiles: any[];
  file: any;
  fileData: any;


  acceptedFileTypes: string = '.csv';
  fileDataCsv: any;
  
  constructor(private http: HttpClient, private api: ApiService, private toastr: ToastrService, private router: Router,private studentService:StudentService) {

    this.csvForm = new FormGroup({
      designation: new FormControl('select', [Validators.required]),
      department: new FormControl('select', [Validators.required]),
    })
   }

   

   ngOnInit(): void {
  
    this.getDepartments()
    this.getDesignations()
    this.getAllClass()

  }
  getDepartments() {
    this.api.getDepartments().subscribe(resp => {
      this.departments = resp.departments
      console.log(this
        .departments);

    });
  }
  getDesignations()
  {
    this.api.getDesignations().subscribe(resp => {
      this.designations = resp.designations
    });
  }
  multipleImForm() {
 
    


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


}
