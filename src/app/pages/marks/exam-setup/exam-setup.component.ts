import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';




@Component({
  selector: 'app-exam-setup',
  templateUrl: './exam-setup.component.html',
  styleUrls: ['./exam-setup.component.scss']
})
export class ExamSetupComponent {
  exams: any
  examForm:  FormGroup
  isLoading: boolean;
  examTerms: any;
  marksDistributions: any;
  selectedLeave: any;
  selectedExam: any;
  inputData: string ;
  selectedRoute: any;
  selectedRow:any;
  tableHeader:any;
  modalRef!: BsModalRef;
  @ViewChild('deletePrompt', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  constructor(private api: ApiService,private toastr: ToastrService ,private route: Router,private modalService: BsModalService ) {
    this.examForm =  new FormGroup ({
      name: new FormControl(null, [Validators.required]),
      term: new FormControl(null, [Validators.required]),
      examtype: new FormControl(null, [Validators.required]),
      marksDistribution: new FormControl(null, [Validators.required]),
      remarks: new FormControl(null, [Validators.required]),


    })

 

  }
  exam:any
  ngOnInit(): void {
    this.getAllExam()
    this.getExamTerms()
    this.getMarksDiturbution()
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "name", dataType: "string", title: 'Exam Name', sort: true, visible: true, search:true },
        {  field: "examtype", dataType: "string", title: 'Exam Type', sort: true, visible: true, search:true },
        {  field: "termName", dataType: "string", title: 'Term', sort: true, visible: true, search:true },
        {  field: "marksDistribution", dataType: "string", title: 'Mark Distribution', sort: true, visible: true, search:true },
        {  field: "remarks", dataType: "string", title: 'Remarks', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false, width:"13%"  }
       ],
      searchPlaceholder:"Search by Exam Name, Exam Type, Term and Mark Distribution",
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

  addExams()
  {
   
    this.isLoading = true;
    this.api.createExam(this.examForm.value).subscribe(resp => {
      console.log(resp);
      
      this.isLoading = false;

      this.toastr.success(resp.message, "exams  add success");
      this.getAllExam();
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "exams  add failed");
      console.error(err);
    })
  }
  // nav extra
  nvativeToSecForm() {
    let naviData: NavigationExtras = {
      queryParams: { data: this.inputData },
    };
    console.log(this.inputData);

    this.route.navigate(['marks/exam-setup/:id'], naviData);
  }
  deleteExams()
  {
    this.isLoading = true;
    this.api.deleteLeave(this.selectedLeave._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      document.getElementById('modalDismissBtn')?.click();

    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }

  getExamTerms()
  {
    this.api.getExamTerms().subscribe(resp => {
      this.examTerms = resp.examTerms;
      console.log(this.examTerms, "exam terms");
      
      this.mapExamTerm();
    });
  }

  mapExamTerm()
  {

    
    // this.examTerms.forEach(exam => {
    //   exam["designationDetail"] = this.examTerms.find(d => d._id == exam.term);
    // });
  
    
  }
  getAllExam(){
    console.log("this");
    
    this.api.getAllExam().subscribe((res)=>{
      this.exams = res.exams
      this.exams.forEach(element => {
        element['termName'] = element.term?.name;
        element['marksDistribution'] = element.marksDistribution[0]?.name;
      });
    })
  }
  getMarksDiturbution(){
    console.log("this");
    
    this.api.getAllMarksDistubutions().subscribe((res)=>{
      this.marksDistributions = res.marksDistributions
      console.log(this.marksDistributions, "first res");
      
    })
  }

  editRoute(route: any)
  {
    this.selectedRoute = route;
    const navExtras: NavigationExtras = {
      state: {
        data: this.selectedRoute
        
      }
      
    };
    console.log(this.selectedRoute);


    this.route.navigate(["/marks/exam-setup/", this.selectedRoute._id], navExtras);
  }

  closePopup(){
    this.modalRef.hide();
  }
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'edit'){
    this.editRoute(this.selectedRow);
    }
    if($event['event'] === 'delete'){
     this.openDeleteModal(this.deleteTemplate, this.selectedRow)
    }

  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.selectedLeave = data;
    this.modalRef = this.modalService.show(template);
  }
}
