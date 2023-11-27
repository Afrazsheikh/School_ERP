import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
 
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categoryData: any[];
  categoryForm:FormGroup;
  modalRef!: BsModalRef;
  categoryId: any;
  caseInsensitive: boolean = false;
  order:  string = 'categoryName';
  reverse: boolean = false;
  searchText: any;
  peopleFilter: any;
  fields = {
    categoryName :''
  };
  selectedRow:any;
  tableHeader:any;
  @ViewChild('template', { read: TemplateRef }) editTemplate:TemplateRef<any>;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,private modalService: BsModalService){

  }
  ngOnInit(): void {  
    this.peopleFilter = this.fields;   
    this.getAllCateogy();
    this.createForm();

    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "categoryName", dataType: "string", title: 'Type', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
       ],
      searchPlaceholder:"Search by Category Name",
      sortBy: { field: 'categoryName', asc: true },
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
  }
  updateFilters(){
    this.fields.categoryName = this.searchText;
    this.peopleFilter = this.fields;
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  getAllCateogy(){
    this.api.getCategory().subscribe(data =>{
      this.categoryData = data.categories;
     });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.categoryForm.controls;
  }
  createForm(){
    this.categoryForm = new FormGroup({
      categoryName: new FormControl(null, [Validators.required]),
      branch:new FormControl('Oxford International'),
      description: new FormControl(null)
    })
  }
  updateForm(data: {categoryName: any; _id: any; }){
    this.categoryForm = new FormGroup({
      id: new FormControl(data._id, [Validators.required]),
      categoryName: new FormControl(data.categoryName, [Validators.required]),
      branch:new FormControl('Oxford International'),
      description: new FormControl(null)
    })
  }
  openModal(template: TemplateRef<any>, data: any) {
    this.updateForm(data);
    this.modalRef = this.modalService.show(template);
  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.categoryId = data._id;
    this.modalRef = this.modalService.show(template);
  }
  addCategory(formdata:any){
    
    let payload = {
      categoryName:formdata.value.categoryName,
      branch:formdata.value.branch, 
      description:formdata.value.description
    }
    
    this.api.saveCategory(payload).subscribe(resp => {
      console.log(resp);
      this.toastr.success(resp.message, "Added success");
      this.getAllCateogy();
      this.categoryForm.reset();
    },
    (err) => {
      this.toastr.error(err, " add failed");
      console.error(err);
    })
  }
  updateCategory(formdata:any){
    console.log(formdata.value);
    let payload = {
      id:formdata.value.id,
      categoryName:formdata.value.categoryName,
      branch:formdata.value.branch, 
      description:formdata.value.description
    }
    this.api.updateCategory(payload).subscribe(resp => {
      this.closePopup();
      this.toastr.success(resp.message, "Updated success");
      this.getAllCateogy();
      this.categoryForm.reset();     
      // this.getExamTerms();
    },
    (err) => {
      this.toastr.error(err, " update failed");
      console.error(err);
    })
  }
  deletePopup(){
    this.api.deleteCategory(this.categoryId).subscribe(resp => {
      this.closePopup();
      this.toastr.success(resp.message, "Deleted success");
      this.getAllCateogy();
    },
    (err) => {
      this.toastr.error(err, " update failed");
      console.error(err);
    })
  }
  closePopup(){
    this.modalRef.hide();
  }
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'edit'){
      this.openModal(this.editTemplate, this.selectedRow)
    }
    if($event['event'] === 'delete'){
      this.openDeleteModal(this.deleteTemplate, this.selectedRow)
    }

  }
}
