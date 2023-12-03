import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-grade-range',
  templateUrl: './grade-range.component.html',
  styleUrls: ['./grade-range.component.scss']
})
export class GradeRangeComponent {
  isLoading: boolean;
  gradeForm : FormGroup
  grade: any;
  selectedGrade: any;
  grades:any ;
  selectedGarde: any;
  selectedRow: any;
  tableHeader: any;
  modalRef!: BsModalRef;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate: TemplateRef<any>;

  constructor(private api: ApiService,private toastr: ToastrService ,  private router: Router,  private modalService: BsModalService ) {
    this.gradeForm =  new FormGroup ({
      name: new FormControl(null, [Validators.required]),
      gradePoint: new FormControl(null, [Validators.required]),
      minPercentage: new FormControl(null, [Validators.required]),
      maxPercentage: new FormControl(null, [Validators.required]),
      remarks: new FormControl(null, [Validators.required])
    })
    
  }


  ngOnInit(): void {
    this.getAllGrade()
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "name", dataType: "string", title: 'Grade Name', sort: true, visible: true, search:true },
        {  field: "gradePoint", dataType: "string", title: 'Grade Point', sort: true, visible: true, search:true },
        {  field: "minPercentage", dataType: "string", title: 'Min Percentage', sort: true, visible: true, search:true},
        {  field: "maxPercentage", dataType: "string", title: 'Max Percentage', sort: true, visible: true, search:true },
        {  field: "remarks", dataType: "string", title: 'Remarks', sort: true, visible: true, search:true,width:"20%" },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
       ],
      searchPlaceholder:"Search by Grade Name, Grade Point and Min/Max Percentage",
      sortBy: { field: 'name', asc: true },
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

addGrade() { 
  this.isLoading = true;
  console.log(this.gradeForm.value);
  
  this.api.createGrades(this.gradeForm.value).subscribe(resp => {
    this.isLoading = false;
    this.toastr.success(resp.message, "Grade add success");
    this.getAllGrade();
  },
  (err) => {
    this.isLoading = false;
    this.toastr.error(err, "exams  add failed");
    console.error(err);
  })
}

editGrade(data: any){

 {
    this.selectedGarde = data;
    const navExtras: NavigationExtras = {
      state: {
        data: this.selectedGarde
      }
    };

    this.router.navigate(["/marks/grade-edit/", this.selectedGarde._id], navExtras);
  }
}

getAllGrade(){
  this.api.getAllGrades().subscribe((res)=>{
    this.grades = res.grades
    console.log(this.grades, "grade res");
    
  })
}

deleteGrade(){
  this.api.deleteGrade(this.selectedGrade._id).subscribe((res)=>{
    console.log(res);
    this.isLoading = false;
    this.closePopup();
    this.toastr.success(res.message, "Deleted Successfully");
    this.getAllGrade();
  },
  (err) => {
    this.isLoading = false;
    console.error(err);
  })
}
rowEvent($event: any) {
  this.selectedRow = $event.lead;
  if($event['event'] === 'edit'){    
    this.editGrade(this.selectedRow);
  }
  if($event['event'] === 'delete'){
    this.openDeleteModal(this.deleteTemplate, this.selectedRow)
  }

  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.selectedGrade = this.selectedRow;
   this.modalRef = this.modalService.show(template);
  }
  closePopup(){
    this.modalRef.hide();
  }
}
