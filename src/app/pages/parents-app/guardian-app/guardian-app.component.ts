import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as moment from 'moment';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { RaisedTicketService } from 'src/app/services/raised-ticket.service';

@Component({
  selector: 'app-guardian-app',
  templateUrl: './guardian-app.component.html',
  styleUrls: ['./guardian-app.component.scss'],
})
export class GuardianAppComponent {
  bannerForm: FormGroup;
  noticeForm: FormGroup;
  notificationForm: FormGroup;
  ticketStatus: FormGroup;
  leaveStatus: FormGroup;
  banners: any[] = [];
  notices: any[] = [];
  notifications: any[] = [];
  raisedTickets: any[] = [];
  leaves: any[] = [];
  selectedTicket: any;
  selectedLeave: any;
  isLoading: boolean;
  bannerFile: any;
  noticeFile: any;
  bannerImage: any;
  noticeImage: any;
  types = ['guardian', 'teacher'];

  isLoaded=false;

  constructor(private api: ApiService, private toastr: ToastrService, private raisedTicketService:RaisedTicketService) {
    this.bannerForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    });

    this.noticeForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    });

    this.notificationForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    });

    this.ticketStatus = new FormGroup({
      status: new FormControl(null, [Validators.required]),
    });

    this.leaveStatus = new FormGroup({
      status: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
   // this.getBanners();
   this.getRaisedTickets();
  }

  getBanners() {
    this.api.getBanners().subscribe((resp) => {
      this.banners = resp.allBanner;
    });
  }

  addBanner() {
    this.isLoading = true;

    let postData = new FormData();
    postData.append('title', this.bannerForm.value.title);
    postData.append('type', this.bannerForm.value.type);
    if (this.bannerFile) {
      postData.append('file', this.bannerFile);
    }

    this.api.addBanner(postData).subscribe(
      (resp) => {
        this.isLoading = false;
        this.toastr.success(resp.message, 'Banner add success');
        this.bannerFile = this.bannerImage = null;
        this.bannerForm.reset();
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, 'Banner add failed');
      }
    );
  }

  addNotice() {
    this.isLoading = true;

    let postData = new FormData();
    postData.append('name', this.noticeForm.value.name);
    postData.append('noticeDate', moment().format('MM/DD/YYYY'));
    postData.append('type', this.noticeForm.value.type);
    postData.append('description', this.noticeForm.value.description);
    if (this.noticeFile) {
      postData.append('file', this.noticeFile);
    }

    this.api.addNotice(postData).subscribe(
      (resp) => {
        this.isLoading = false;
        this.toastr.success(resp.message, 'Notice board add success');
        this.noticeForm.reset();
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, 'Notice board add failed');
      }
    );
  }

  addNotification() {
    this.isLoading = true;
    this.api.addNotification(this.notificationForm.value).subscribe(
      (resp) => {
        this.isLoading = false;
        this.toastr.success(resp.message, 'Notification add success');
        this.notificationForm.reset();
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, 'Notification add failed');
      }
    );
  }

  onFilesDropped(files: NgxFileDropEntry[], imgType: string) {
    console.log(files);
    if (files.length > 1) {
      alert('Please upload a single file');
    } else {
      for (const droppedFile of files) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          const reader = new FileReader();

          fileEntry.file((file: File) => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              if (imgType == 'banner') {
                this.bannerImage = reader.result;
              } else if (imgType == 'notice') {
                this.noticeImage = reader.result;
              }
            };

            if (imgType == 'banner') {
              this.bannerFile = file;
            } else if (imgType == 'notice') {
              this.noticeFile = file;
            }
          });
        }
      }
    }
  }

  tabChange(event: MatTabChangeEvent) {
    if (event.index == 1) {
      this.getNotices();
    } else if (event.index == 2) {
      this.getNotifications();
    } else if (event.index === 3) {
      this.getRaisedTickets();
    }
    /* else if(event.index === 4) {
      this.getAllLeaves();
    } */
  }

  getNotices() {
    this.api.getNotices().subscribe((resp) => {
      this.notices = resp.noticeBoard;
    });
  }

  getNotifications() {
    this.api.getNotifications().subscribe((resp) => {
      this.notifications = resp.notification;
    });
  }

  getRaisedTickets() {
    this.api.getRaisedTickets().subscribe((resp) => {
      this.raisedTickets = resp.raiseATicket;
      this.raisedTicketService.getRaiseTicketTeacher().subscribe(data=>{
        if(data && data.raiseATicket){
          this.raisedTickets=[...this.raisedTickets, ...data.raiseATicket];
          this.mapStudents();
        }else{
          this.mapStudents();
        }
      })
      
    });
   // this.getRaisedTicketsByTeacher();
  }
  getRaisedTicketsByTeacher() {
    this.api.getRaisedTicketsTeacher().subscribe((resp) => {
      this.raisedTickets = resp.raiseATicket;
      this.mapStudents();
    });
  }
  
  mapStudents() {
    const observables: Observable<any>[] = [];
    observables.push(this.api.getAllStudents());
    observables.push(this.api.getAllAcademic());
    observables.push(this.api.getAllClass());
    observables.push(this.api.getAllSection());
    observables.push(this.api.getTeacherList());

    let students = [],
      academics = [],
      classes = [],
      sections = [],
      teachers=[];
    forkJoin(observables).subscribe((response) => {
      students = response[0].students;
      academics = response[1].academics;
      classes = response[2].classes;
      sections = response[3].sections;
      teachers = response[4].teachers;

      academics.forEach((academic) => {
        if (academic.studentClass) {
          academic.studentClass = classes.find(
            (c) => c._id === academic.studentClass
          );
        }

        if (academic.section) {
          academic.section = sections.find((s) => s._id === academic.section);
        }
      });

      this.raisedTickets.forEach((ticket) => {
        if ( ticket.raiseType=='guardian') {
          ticket.student = students.find((s) => s._id === ticket.student);
          ticket.student.academic = academics.find(
            (a) => a._id === ticket.student.academic._id
          );
        }
        if ( ticket.raiseType=='teacher') {
          ticket.student = teachers.find((s) => s._id === ticket.student);
          // ticket.student.academic = academics.find(
          //   (a) => a._id === ticket.student.academic._id
          // );
        }
      });
      this.isLoaded=true;
      console.log(this.raisedTickets);
    });
  }

  /* getAllLeaves() {
    this.api.getLeaveApplication().subscribe(resp => {
      this.leaves = resp.leavesRequest;
    });
  } */

  setTicket(ticket) {
    this.selectedTicket = ticket;
    this.ticketStatus.patchValue({ status: this.selectedTicket.status });
  }

  updateTicketStatus() {
    this.isLoading = true;
    const postData = this.ticketStatus.value;
    postData['raiseATicketId'] = this.selectedTicket._id;
    this.api.updateTicketStatus(postData).subscribe(
      (resp) => {
        this.isLoading = false;
        this.toastr.success(resp.message, 'Status update success');
        document.getElementById('updateStatusModal').click();
        this.getRaisedTickets();
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, 'Status update failed');
      }
    );
  }

  /* setLeave(leave) {
    this.selectedLeave = leave;
    this.leaveStatus.patchValue({status: this.selectedLeave.status});
  }

  updateLeaveStatus()
  {
    this.isLoading = true;
    const postData = this.leaveStatus.value;
    postData['leavesRequestId'] = this.selectedLeave._id;
    this.api.updateLeaveStatus(postData).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, "Status update success");
      document.getElementById('updateLeaveStatusModal').click();
      this.getAllLeaves();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Status update failed");
    });
  } */
}
