import { Component, TemplateRef, ViewChild } from '@angular/core';
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
  selectedRow:any;
  tableHeader:any;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  constructor(private api: ApiService, private toastr: ToastrService,private router: Router,private modalService: BsModalService) {
    
  }
  ngOnInit(){
    this.getNotifications();
    this.tableHeader = {
      data: [
        {  field: "title", dataType: "string", title: 'Title', sort: true, visible: true, search:true },
        {  field: "description", dataType: "string", title: 'Description', sort: false, visible: true, search:false , width:"30%"},
        {  field: "notiType", dataType: "string", title: 'Type', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
       ],
      searchPlaceholder:"Search by Title and Type",
      sortBy: { field: 'title', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {
         
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
  rowEvent($event: any) {
    this.selectedRow = $event.lead;      
    if($event['event'] === 'delete'){
      this.openDeleteModal(this.deleteTemplate, this.selectedRow)
    }

  }
}