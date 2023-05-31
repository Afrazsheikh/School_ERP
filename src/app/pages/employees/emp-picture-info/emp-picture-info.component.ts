import { Component, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentService } from '../../student-details/student.service';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-emp-picture-info',
  templateUrl: './emp-picture-info.component.html',
  styleUrls: ['./emp-picture-info.component.scss']
})
export class EmpPictureInfoComponent {
  @Input() employeeData: any ;
  employee:any;
  isUploadImage = false;
  image: any;
  constructor(private api: ApiService,private toastr: ToastrService, private router: Router, private studentService:StudentService) {
  }
 ngOnInit() {
  this.employee = this.employeeData;
  
 }
 uploadImage(value){
  this.isUploadImage = value;
 }  
 SaveImage(){
  let postData = new FormData();
  if(this.image) {
    postData.append("file", this.image);
    postData.append("employeeId", this.employee?._id);
    this.api.updateEmpployee(postData).subscribe(resp => {
      this.toastr.success(resp[0].msg, "Updated  Successfully");
     this.employee.image =resp[0]['data']['image'];
      this.isUploadImage = false;
      this.image=null
     },
     (err) => {
       this.toastr.error(err, " update failed");
       console.error(err);
     })
  } else {
    this.toastr.error("Make sure the image is uploaded correctly");
  }
 }
 onFilesDropped(files: NgxFileDropEntry[], imgType: string)
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
           if(imgType == 'image') {
             this.image = file;
           }
         })
       }
     }
   }
 }
 backButtonClick(){
    this.studentService.studentDetailBackAction.isBack = true;
    this.router.navigate(['/employee/list']);
 }
}
