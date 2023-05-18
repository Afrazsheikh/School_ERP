import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentService} from '../student.service';
@Component({
  selector: 'app-stud-info-picture',
  templateUrl: './stud-info-picture.component.html',
  styleUrls: ['./stud-info-picture.component.scss']
})
export class StudInfoPictureComponent {
  @Input() studentData: any ;
  student:any;
  isUploadImage = false;
  image: any;
  constructor(private api: ApiService,private toastr: ToastrService, private router: Router, private studentService:StudentService) {
  }
 ngOnInit() {
  this.student = this.studentData;
  
 }
 uploadImage(value){
  this.isUploadImage = value;
 }  
 SaveImage(){
  let postData = new FormData();
  if(this.image) {
    postData.append("image", this.image);
    this.api.editStudent(postData, this.studentData._id).subscribe(resp => {
      this.toastr.success(resp.message, "Updated  Successfully");
      this.student.image =resp[0]['data']['image'];
      this.isUploadImage = false;
      this.image=null
     // this.router.navigate(['/student-details/student-list']);
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
    this.router.navigate(['/student-details/student-list']);
 }
}
