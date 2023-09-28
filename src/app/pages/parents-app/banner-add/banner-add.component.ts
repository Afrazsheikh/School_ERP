import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Router } from '@angular/router';
@Component({
  selector: 'app-banner-add',
  templateUrl: './banner-add.component.html',
  styleUrls: ['./banner-add.component.scss']
})
export class BannerAddComponent {
  bannerForm: FormGroup;
  bannerFile: any;
  isLoading: boolean;
  bannerImage: any;
  types = ['guardian', 'teacher'];
  constructor(private api: ApiService, private toastr: ToastrService,private router: Router) {
    
  }
  ngOnInit(){
    this.bannerForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      // type: new FormControl(null, [Validators.required]),
    });

  }
  addBanner() {
    this.isLoading = true;

    let postData = new FormData();
    postData.append('title', this.bannerForm.value.title);
  //  postData.append('type', this.bannerForm.value.type);
    if (this.bannerFile) {
      postData.append('file', this.bannerFile);
    }

    this.api.addBanner(postData).subscribe(
      (resp) => {
        this.isLoading = false;
        this.toastr.success(resp.message, 'Banner add success');
        this.bannerFile = this.bannerImage = null;
        this.bannerForm.reset();
        this.backBtnClick();
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, 'Banner add failed');
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
              if (imgType == 'banner') {
                this.bannerImage = reader.result;
              } 
            };

            if (imgType == 'banner') {
              this.bannerFile = file;
            } 
          });
        }
      }
    }
  }
  backBtnClick(){
    this.router.navigate(['/parent/banner-list']);
  }
}
