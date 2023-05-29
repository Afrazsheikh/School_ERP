import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentService } from '../../student-details/student.service';

@Component({
  selector: 'app-emp-baisc',
  templateUrl: './emp-baisc.component.html',
  styleUrls: ['./emp-baisc.component.scss']
})
export class EmpBaiscComponent {
  @Input() employeeData: any ;
 
 
 ngOnInit() {
 
 }
}
