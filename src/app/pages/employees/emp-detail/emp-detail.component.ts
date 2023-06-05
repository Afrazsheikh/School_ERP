import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.scss']
})
export class EmpDetailComponent {

  employee: any
  employeeId:any;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  )
  {
    route.params.subscribe(param => {
     this.employeeId = param['id'];
    });
  }

  ngOnInit(): void {
    this.getEmployeeData();
  }
  getEmployeeData(){
    this.spinner.show();
    this.api.getAllEmployeesById(this.employeeId).subscribe(resp => {
      this.spinner.hide();    
      this.employee = resp['employee'];
    },
    (err) =>{
      this.spinner.hide(); 
      this.toastr.error(err);
    });
  }


}

