import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { EmpAddComponent } from 'src/app/pages/employees/emp-add/emp-add.component';
import { ApiService } from 'src/app/services/api.service';

import { map , tap} from "rxjs/operators";

@Component({
  selector: 'app-exam-setup-edit',
  templateUrl: './exam-setup-edit.component.html',
  styleUrls: ['./exam-setup-edit.component.scss']
})
export class ExamSetupEditComponent {
  exams: any
  examForm:  FormGroup
  isLoading: boolean;
  examTerms: any;
  marksDistributions: any;
  selectedLeave: any;
  examId:  string

  naviData: string ;
  editRoute: any;

  term: string;



  constructor(private api: ApiService,private toastr: ToastrService ,
    private route: ActivatedRoute,
    private router: Router)  {

    route.params.subscribe(param => {
      if(router.getCurrentNavigation()?.extras.state) {
        this.editRoute = router.getCurrentNavigation()?.extras.state?.['data'];
        this.examId = this.editRoute._id;
        this.term = this.editRoute.term?._id
        console.log(this.editRoute);
        console.log(this.term);


        this.createForm()

      }
    });
  }



exam:any
  ngOnInit(): void {
    this.getAllExam()
    this.getMarksDiturbution()
    this.getExamTerms()
   }

createForm(){
  this.examForm =  new FormGroup ({
    name: new FormControl(this.editRoute.name, [Validators.required]),
    term: new FormControl(this.editRoute.term?._id, [Validators.required]),
    examtype: new FormControl(this.editRoute.examtype, [Validators.required]),
    marksDistribution : new FormControl(this.editRoute.marksDistribution[0]['_id'], [Validators.required]),
    remarks: new FormControl(this.editRoute.remarks, [Validators.required]),
})
}
getExamTerms()
{
  this.api.getExamTerms().subscribe(resp => {
    this.examTerms = resp.examTerms;
    console.log(this.examTerms, "exam terms");
    this.examForm.patchValue({
      term:this.editRoute.term?._id
    })
  });
}
getAllExam(){
  console.log("this");

  this.api.getAllExam().subscribe((res)=>{
    this.exams = res.exams
    console.log(this.exams, "first res");

  })
}
getMarksDiturbution(){
  console.log("this");

  this.api.getAllMarksDistubutions().subscribe((res)=>{
    this.marksDistributions = res.marksDistributions;
    this.examForm.patchValue({
      marksDistribution:this.editRoute.marksDistribution[0]['_id']
    })
    console.log(this.marksDistributions, "first res");

  })
}


update()
{
  this.isLoading = true;

  this.api.updateExam(this.examId, this.examForm.value).subscribe(resp => {
    this.isLoading = false;
    this.toastr.success(resp.message, "exam update success");
  },
  (err) => {
    this.isLoading = false;
    this.toastr.error(err, "exam update failed");
  });
}

}
