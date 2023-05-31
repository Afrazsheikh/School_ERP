import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-stu-info-document',
  templateUrl: './stu-info-document.component.html',
  styleUrls: ['./stu-info-document.component.scss']
})
export class StuInfoDocumentComponent {
  @Input() studentData: any ;
  document:any;
  guardianDocu_pre:any;
  guardianImg_pre:any;
  idcard_pre:any;
  profile_pre:any;
  image: any;
  idCardDocument: any;
  GuardianImage: any;
  guardianProf: any;
  studentId:any;
  constructor(private api: ApiService,private toastr: ToastrService, private router: Router) {
  }
 ngOnInit() {
  this.studentId = this.studentData['_id'];
  this.guardianDocu_pre = this.studentData?.guardian?.idProofDocument;
  this.guardianImg_pre = this.studentData?.guardian?.image;
  this.idcard_pre= this.studentData?.idCardDocument;
  this.profile_pre = this.studentData?.image;

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
           else if(imgType == 'idCardDocument') {
             this.idCardDocument = file;
           }
           else if(imgType == 'GuardianImage') {
             this.GuardianImage = file;
           }
           else if(imgType == 'guardianProf') {
             this.guardianProf = file;
           }
 
         })
       }
     }
   }
 }

 saveInfo(){
  let postData = new FormData();
  if(this.idCardDocument || this.GuardianImage || this.guardianProf) {
    if(this.idCardDocument) {
      postData.append("idCardDocument", this.idCardDocument);
    }
    if(this.GuardianImage) {
      postData.append("guardian.image", this.GuardianImage);
    }
    if(this.guardianProf) {
      postData.append("guardian.idProofDocument", this.guardianProf);
    }
    
    this.api.editStudent(postData, this.studentId).subscribe(resp => {
      this.toastr.success(resp.message, "Updated  Successfully");
      this.getStudentDetail();
      this.idCardDocument=null ;
      this.guardianProf=null ;
      this.GuardianImage=null ;
     },
     (err) => {
       this.toastr.error(err, " update failed");
       console.error(err);
     })
  } else {
    this.toastr.error("Make sure the image is uploaded correctly");
  }
 
 }
 getStudentDetail(){
  this.api.getStudentById(this.studentId).subscribe(resp => {
    this.studentData = resp['student'];
    this.guardianDocu_pre = this.studentData['guardian']['idProofDocument'];
    this.guardianImg_pre = this.studentData['guardian']['image'];
    this.idcard_pre= this.studentData['idCardDocument'];
  });
 }
}

