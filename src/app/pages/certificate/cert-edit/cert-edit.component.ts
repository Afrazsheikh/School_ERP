import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cert-edit',
  templateUrl: './cert-edit.component.html',
  styleUrls: ['./cert-edit.component.scss']
})
export class CertEditComponent {

  certiForm: FormGroup
  certi: any;
  students: any[] = [];
  employees: any[] = [];
  selectedCert: any;
  isLoading: boolean;
  signImg: any;
  logoImg: any;
  backImg: any;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  )
  {
    this.certiForm =  new FormGroup ({
      name: new FormControl(null, [Validators.required]),
      /* certType: new FormControl('select', [Validators.required]), */
      applicableUser: new FormControl('select', [Validators.required]),
      pageLayout: new FormControl('select', [Validators.required]),
      userPhotoStyle: new FormControl('select', [Validators.required]),
      userPhotoSize: new FormControl(null, [Validators.required]),
      top:  new FormControl(null, [Validators.required]),
      bottom: new FormControl(null, [Validators.required]),
      right: new FormControl(null, [Validators.required]),
      left: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    });

    route.params.subscribe(param => {
      if(router.getCurrentNavigation()?.extras.state) {
        this.certi = router.getCurrentNavigation()?.extras.state?.['data'];
        this.patchForm();
      }
    });
  }

  ngOnInit(): void {}

  patchForm()
  {
    console.log(this.certi);
    this.certiForm.patchValue({
      name: this.certi.name,
      applicableUser: this.certi.applicableUser,
      pageLayout: this.certi.pageLayout,
      userPhotoStyle: this.certi.userPhotoStyle,
      userPhotoSize: this.certi.userPhotoSize,
      top:  this.certi.layoutSpacing.top,
      bottom: this.certi.layoutSpacing.bottom,
      right: this.certi.layoutSpacing.right,
      left: this.certi.layoutSpacing.left,
      content: this.certi.content,
    });
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
            if(imgType == 'signImg') {
              this.signImg = file;
            }
            else if(imgType == 'logoImg') {
              this.logoImg = file;
            }
            else if(imgType == 'backImg') {
              this.backImg = file;
            }
          })
        }
      }
    }
  }

  updateCerti()
  {
    console.log(this.certiForm.value);

    this.isLoading = true;

    let postData = new FormData();
    postData.append("name", this.certiForm.value.name);
    postData.append("applicableUser", this.certiForm.value.applicableUser);
    /* if(this.certiForm.value.certType == 'student') {
      postData.append("applicableStudent", this.certiForm.value.userId);
    }
    else if(this.certiForm.value.certType == 'employee') {
      postData.append("applicableEmployee", this.certiForm.value.userId);
    } */
    postData.append("pageLayout", this.certiForm.value.pageLayout);
    postData.append("userPhotoStyle", this.certiForm.value.userPhotoStyle);
    postData.append("userPhotoSize", this.certiForm.value.userPhotoSize);
    postData.append("layoutSpacing[top]", this.certiForm.value.top);
    postData.append("layoutSpacing[bottom]", this.certiForm.value.bottom);
    postData.append("layoutSpacing[left]", this.certiForm.value.left);
    postData.append("layoutSpacing[right]", this.certiForm.value.right);
    if(this.signImg) {
      postData.append("signatureImage", this.signImg);
    }
    if(this.logoImg) {
      postData.append("logoImage", this.logoImg);
    }
    if(this.backImg) {
      postData.append("backgroundImage", this.backImg);
    }
    postData.append("content", this.certiForm.value.content);

    this.api.updateCertificate(this.certi._id, postData).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;

      this.toastr.success(resp.message, "Certificate update success");
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Certificate update failed");
      console.error(err);
    })
  }
}
