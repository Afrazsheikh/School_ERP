import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-emp-desg',
  templateUrl: './emp-desg.component.html',
  styleUrls: ['./emp-desg.component.scss']
})
export class EmpDesgComponent {

  designations: any[] = [];
  isLoading: boolean;
  designForm: FormGroup;
  editDesign: FormGroup;
  selectedDesign: any;
  fileDataCsv: any;
  csvForm: FormGroup
  fileData: any;
  acceptedFileTypes: string = '.csv';
  departments: any[] = [];

  constructor(private api: ApiService, private toastr: ToastrService) {
    this.designForm = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    this.editDesign = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getDesignations();
    this.getDepartments();
  }
  multipleImForm() {
 
      this.csvForm = new FormGroup({
        designation: new FormControl('select', [Validators.required]),
        department: new FormControl('select', [Validators.required]),
      })

  }
  getDesignations()
  {
    this.api.getDesignations().subscribe(resp => {
      this.designations = resp.designations
    });
  }

  addDesignation()
  {
    this.isLoading = true;
    this.api.addDesignation(this.designForm.value).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;

      this.toastr.success(resp.message, "Department add success");
      this.designForm.reset();
      this.getDesignations();
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Department add failed");
      console.error(err);
    })
  }

  setDesignation(dept: any)
  {
    console.log(dept._id);
    
    this.selectedDesign = dept;
    this.editDesign.patchValue({name: dept.name});
  }

  // updateDesignation()
  // {
  //   console.log(this.selectedDesign._id);
    
  //   this.isLoading = true;
  //   this.api.updateDesignation(this.selectedDesign._id, this.editDesign.value).subscribe(resp => {
  //     console.log(resp);

  //     this.isLoading = false;

  //     document.getElementById('editModalDismissBtn')?.click();
  //     this.toastr.success(resp.message, "Designations update success");
  //     this.getDesignations();
  //   ;
  //   },
  //   (err) => {
  //     this.isLoading = false;
  //     this.toastr.error(err, "Designations update failed");
  //     console.error(err);
  //   })
  // }

  deleteDesignation()
  {
    this.isLoading = true;
    this.api.deleteDesignation(this.selectedDesign._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      document.getElementById('modalDismissBtn')?.click();
      this.getDesignations();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
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

  getDepartments() {
    this.api.getDepartments().subscribe(resp => {
      this.departments = resp.departments
      console.log(this
        .departments);

    });
  }
}
