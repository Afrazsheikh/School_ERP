import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry } from 'ngx-file-drop';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notic-board-add',
  templateUrl: './notic-board-add.component.html',
  styleUrls: ['./notic-board-add.component.scss']
})
export class NoticBoardAddComponent {
  noticeForm: FormGroup;
  isLoading: boolean;
  noticeFile: any;
  noticeImage: any;
  types = ['guardian', 'teacher'];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router) {
    
  }
  ngOnInit(){
    this.noticeForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    });
  }
  addNotice() {
    this.isLoading = true;

    let postData = new FormData();
    postData.append('name', this.noticeForm.value.name);
    postData.append('noticeDate', moment().format('MM/DD/YYYY'));
    postData.append('type', this.noticeForm.value.type);
    postData.append('description', this.noticeForm.value.description);
    if (this.noticeFile) {
      postData.append('file', this.noticeFile);
    }

    this.api.addNotice(postData).subscribe(
      (resp) => {
        this.isLoading = false;
        this.toastr.success(resp.message, 'Notice board add success');
        this.noticeForm.reset();
        this.backBtnClick();
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, 'Notice board add failed');
      }
    );
  }
  
  onFilesDropped(files: NgxFileDropEntry[], imgType: string) {
    console.log(files);
    if (files.length > 1) {
      alert('Please upload a single file');
    } else {
      for (const droppedFile of files) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          const reader = new FileReader();

          fileEntry.file((file: File) => {
            reader.readAsDataURL(file);
            reader.onload = () => {
            if (imgType == 'notice') {
                this.noticeImage = reader.result;
              }
            };

            if (imgType == 'notice') {
              this.noticeFile = file;
            }
          });
        }
      }
    }
  }
  backBtnClick(){
    this.router.navigate(['/parent/notice-board-list']);
  }
}
