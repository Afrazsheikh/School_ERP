import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.scss']
})
export class TeacherScheduleComponent {
  teacher: any;
  employees: any[] = [];
  filteredEmp: any[] = []
  scheduleArr:any[] =[];
  constructor(private api: ApiService, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees()
  {
    this.api.getTeacherList().subscribe(resp => {
      this.filteredEmp= this.employees = resp.teachers;
      
    });
  }
  filterTeachSche(){
    const payload ={
      teacher :this.teacher
    }
    this.api.getTeacherSchedule(payload).subscribe(resp => {
      this.scheduleArr  = resp.schedule;      
    });
  }
}
