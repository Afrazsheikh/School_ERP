import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-control-class',
  templateUrl: './control-class.component.html',
  styleUrls: ['./control-class.component.scss']
})
export class ControlClassComponent {

   @ViewChild('closeButton') closeButton;
   selectedRow:any;
   tableHeader:any;
   modalRef!: BsModalRef;
   @ViewChild('editClassTemplate', { read: TemplateRef }) editTemplate:TemplateRef<any>;
   @ViewChild('deleteClassTemplate', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  ClassForm:  FormGroup
  sectionForm: FormGroup
  editClass: FormGroup
  editSection : FormGroup
  isLoading: boolean;
  sections: any[] = [];
  classes: any[] = [];
  selectedDesign: any;
  _id: string;

  constructor(private api: ApiService, private toastr: ToastrService,  private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private modalService: BsModalService) {
    this.ClassForm = new FormGroup({
      className: new FormControl(null, [Validators.required]),
      // sections: new FormControl(null, [Validators.required]),
      sections: new FormControl('select', [Validators.required]),

      classNumeric: new FormControl(null, [Validators.required])
  

    });

    this.sectionForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      capacity: new FormControl(null, [Validators.required]),


    });
    this.editClass = new FormGroup({
       
        classId: new FormControl(null),

      className: new FormControl(null, [Validators.required]),
    
      sections: new FormControl(null, [Validators.required]),

      classNumeric: new FormControl(null, [Validators.required]),
      capacity: new FormControl(null, [Validators.required]),

  

    });
    
    this.editSection = new FormGroup({
      
      sectionId: new FormControl(null, [Validators.required]),

      name: new FormControl(null, [Validators.required]),
      capacity: new FormControl(null, [Validators.required]),


    });

  }

  ngOnInit(): void {
  
    
    this.getAllSection();
    this.getAllClass()
  }
  setClass(dept: any)
  {

    console.log(dept);
    
    this.selectedDesign = dept;

    this.editClass.patchValue({
      classId: dept._id,
      className: dept.className,
      classNumeric: dept.classNumeric,
      sections: dept.sections[0]?._id,

    });

   
  }
  setSection(dept: any)
  {

    console.log(dept);
    
    this.selectedDesign = dept;

    this.editSection.patchValue({
      sectionId: dept._id,
      name: dept.name,
      capacity: dept.capacity,
    
    });

   
  }
  getAllSection(){
   
  
      this.api.getAllSection().subscribe(resp => {
        console.log(resp);
        
        this.sections = resp.sections
      });
  
  }

  getAllClass(){
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "className", dataType: "string", title: 'Class Named', sort: true, visible: true, search:true },
        {  field: "classNumeric", dataType: "string", title: 'Class Numerice', sort: true, visible: true, search:true },
        {  field: "sectionsName", dataType: "string", title: 'Section', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
       ],
      searchPlaceholder:"Search by Class Named and Section",
      sortBy: { field: 'className', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {
         
          edit: {
            show: true,
            callback: () => {
              
            },
          },
          delete: {
            show: true,
            callback: () => {
              // $('#detail-grievance').modal('show')
  
            },
          },
        },
      },
    }
    this.spinner.show();
    this.api.getAllClass().subscribe(resp => {
      this.spinner.hide();
      this.classes = resp.classes;
      this.classes.forEach(element => {
        if(element?.sections){
          element['sectionsName'] =element.sections[0]?.name;
        }
      });
    },
    (err)=>{
      this.spinner.show();
    });

}


  addClass()
  {
    this.isLoading = true;
    this.api.addClass( this.ClassForm.value).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;

      this.toastr.success(resp.message, "Class add success");
      // this.designForm.reset()
      this.ClassForm.reset();
     this.getAllClass()
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Class add failed");
      console.error(err);
    })
  }

  addSection()
  {
    this.isLoading = true;
    this.api.addSection(this.sectionForm.value).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;

      this.toastr.success(resp.message, "Section  add success");
  this.getAllSection()
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "section add failed");
      console.error(err);
    })
  }

  // deleteClass(){

  //   this.isLoading = true;
  //   this.api.deleteClass(this.selectedDesign._id).subscribe(resp => {
  //     console.log(resp);
  //     this.isLoading = false;
  //     this.toastr.success(resp.message, "Class  Deleted successfully");
  //     document.getElementById('modalDismissBtn')?.click();
  //     this.getAllClass()
  //   },
  //   (err) => {
  //     this.isLoading = false;
  //     console.error(err);
  //   })
  // }
  deleteSection(){

    this.isLoading = true;
    this.api.deleteSection(this.selectedDesign._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
   

      this.toastr.success(resp.message, "Section  Deleted successFully");
      document.getElementById('modalDismissBtn')?.click();
     
      this.getAllSection()
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }

  deleteClass(){

    this.isLoading = true;
    this.api.deleteClass(this.selectedDesign._id).subscribe(resp => {
    console.log(resp);
    this.isLoading = false;
    this.toastr.success(resp.message, "Class  Deleted successFully");
    this.closePopup();
    this.getAllClass()
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
  updateClass(){
    this.isLoading = true;
    console.log(":this.editDistForm.value", this.editClass.value);
    const payload ={
      classId : this.editClass.value?.classId, 
      className : this.editClass.value?.className, 
      sections : this.editClass.value?.sections, 
      classNumeric : this.editClass.value?.classNumeric
    }
    this.api.updateclass(payload).subscribe(resp => {
      console.log(resp);
      
      this.isLoading = false;
      this.toastr.success(resp.message, "  update success");
      this.closePopup();
      this.getAllClass();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "E update failed");
    })

  }
  updateSection(){
    this.isLoading = true;
    console.log(":this.editDistForm.value", this.editSection.value);
    
    this.api.updateSection(this.editSection.value).subscribe(resp => {
      console.log(resp);
      
      this.isLoading = false;
      this.toastr.success(resp.message, " section update success");
      document.getElementById('editModalDismissBtna')?.click();
      this.getAllSection();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "section  update failed");
    })

  }
  openModal(template: TemplateRef<any>, data: any) {
    this.modalRef = this.modalService.show(template);
  }
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'edit'){
      this.setClass(this.selectedRow);
      this.openModal(this.editTemplate, this.selectedRow)
    }
    if($event['event'] === 'delete'){
      this.selectedDesign=  this.selectedRow;
      this.openModal(this.deleteTemplate, this.selectedRow)
    }

  }
  closePopup(){
    this.modalRef.hide();
  }
}
