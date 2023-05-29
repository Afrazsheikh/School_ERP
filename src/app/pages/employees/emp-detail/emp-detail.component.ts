import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
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
    private router: Router
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
    this.api.getAllEmployeesById(this.employeeId).subscribe(resp => {
      console.log(resp);      
      this.employee = resp['employee'];
    });
  }


}

