import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  tableHeader: any
  transformedData: any[];
  constructor(private api: ApiService, private toastr: ToastrService,private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.getEmployees();
    this.tableHeader = {
      data: [
        { field: 'day', dataType: 'string', title: 'Day', sort: true, visible: true, search: true },
        // { field: 'activities', dataType: 'string', title: 'Activities ', sort: true, visible: true, search: true },
        { field: 'subjectName', dataType: 'string', title: 'Subject Name Type ', sort: true, visible: true, search: true },
        { field: 'time', dataType: 'string', title: 'Time  ', sort: true, visible: true, search: true },
        { field: 'teacherName', dataType: 'string', title: 'Teacher Name  ', sort: true, visible: true, search: true },


        // Add more fields as needed
        // { field: 'action', dataType: 'action', title: 'Action', sort: false, visible: true, search: false }
      ],
      searchPlaceholder: 'Search by Subject Name, teacherName',
      sortBy: { field: 'subjectName', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {
          edit: {
            show: true,
            callback: () => {
              // Handle edit action
            },
          },
          delete: {
            show: true,
            callback: () => {
              // Handle delete action
            },
          },
        },
      },
    };

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
    this.spinner.show();
    this.api.getTeacherSchedule(payload).subscribe(resp => {
      this.spinner.hide();
      this.transformedData = this.prepareTableData(resp.schedule);
      this.scheduleArr  = resp.schedule;      
    },
    (err)=>{
      this.spinner.hide();
    });
  }
  
  // Helper method to prepare data for the dynamic table
  private prepareTableData(scheduleArr: any[]): any[] {
    return scheduleArr.map((data) => ({
      day: data.day,
      activities: data.activities,
      subjectName: this.extractSubjectNames(data.activities),
      time: this.extractTimes(data.activities),
      teacherName: this.extractTeacherNames(data.activities),
    }));
  }

  // Helper method to extract subject names from activities
  private extractSubjectNames(activities: any[]): string {
    return activities.map((row) => row.subject?.subjectName).join(', ');
  }

  // Helper method to extract times from activities
  private extractTimes(activities: any[]): string {
    return activities.map((row) => `(${row.time})`).join(', ');
  }
  // Helper method to extract teacher names from activities
private extractTeacherNames(activities: any[]): string {
  return activities.map((row) => row.teacher?.name).join(', ');
}
}
