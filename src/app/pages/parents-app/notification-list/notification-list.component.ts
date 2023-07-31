import { Component, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent {
  notifications: any[] = [];
  modalRef!: BsModalRef;
  notificationId:any;
  constructor(private api: ApiService, private toastr: ToastrService,private router: Router,private modalService: BsModalService) {
    
  }
  ngOnInit(){
    this.getNotifications();
  }
  
  getNotifications() {
    this.api.getNotifications().subscribe((resp) => {
      this.notifications = resp.notification;
    });
  }
  addBtnClick(){
    this.router.navigate(['/parent/notification-add']);
  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.notificationId = data._id;
    this.modalRef = this.modalService.show(template);
  }
  deletePopup(){
    this.api.deleteNotificationById(this.notificationId).subscribe(resp => {
      this.closePopup();
      this.toastr.success(resp.message, "Deleted success");
      this.getNotifications();
    },
    (err) => {
      this.toastr.error(err, " Deleted failed");
      console.error(err);
    })
  }
  closePopup(){
    this.modalRef.hide();
  }
}