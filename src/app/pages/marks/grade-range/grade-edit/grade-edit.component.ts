import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-grade-edit',
  templateUrl: './grade-edit.component.html',
  styleUrls: ['./grade-edit.component.scss']
})
export class GradeEditComponent {
  isLoading: boolean;
  gradeForm : FormGroup
  grade: any;
  selectedGrade: any;
  grades:any [] ;
  editGrade: any;
  gradeId: string
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  )
  {
    route.params.subscribe(param => {
      if(router.getCurrentNavigation()?.extras.state) {
        this.editGrade = router.getCurrentNavigation()?.extras.state?.['data'];
        this.gradeId = this.editGrade._id;
        this.createForm();
      }
    });
  }
  createForm()
  {
    this.gradeForm = new FormGroup({
      name: new FormControl(this.editGrade.name, [Validators.required]),
      gradePoint: new FormControl(this.editGrade.gradePoint, [Validators.required]),
      minPercentage: new FormControl(this.editGrade.minPercentage, [Validators.required]),
      maxPercentage: new FormControl(this.editGrade.maxPercentage, [Validators.required]),
      remarks: new FormControl(this.editGrade.remarks, [Validators.required]),
    });
  }

  updateGrade()
  {
    this.isLoading = true;
    this.api.updategrade(this.gradeId, this.gradeForm.value).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, "Route update success");
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Route update failed");
    });
  }
  gradeList(){
    this.router.navigate(['/marks/grade']);
  }

}
