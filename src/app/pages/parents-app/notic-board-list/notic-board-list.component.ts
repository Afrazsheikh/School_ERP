import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-notic-board-list',
  templateUrl: './notic-board-list.component.html',
  styleUrls: ['./notic-board-list.component.scss']
})
export class NoticBoardListComponent {
  notices:any[] = [];
  modalRef!: BsModalRef;
  noticId:any;
  selectedRow:any;
  tableHeader:any;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  constructor(private api: ApiService, private toastr: ToastrService,private router: Router,private modalService: BsModalService) {
    
  }
  ngOnInit(){
    this.getNotices();
    this.tableHeader = {
      data: [
        {  field: "name", dataType: "string", title: 'Name', sort: true, visible: true, search:true },
        {  field: "description", dataType: "string", title: 'Description', sort: false, visible: true, search:false , width:"30%"},
        {  field: "noticeDate", dataType: "date", title: 'Date', sort: true, visible: true, search:true },
        {  field: "imageAttachment", dataType: "img", title: 'Banner Image', sort: true, visible: true, search:true },
        {  field: "noticeBoardType", dataType: "string", title: 'Type', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
       ],
      searchPlaceholder:"Search by Name and Type",
      sortBy: { field: 'name', asc: true },
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
  getNotices() {
    this.api.getNotices().subscribe((resp) => {
      this.notices = resp.noticeBoard;
    });
  }
  addBtnClick(){
    this.router.navigate(['/parent/notice-board-add']);
  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.noticId = data._id;
    this.modalRef = this.modalService.show(template);
  }
  deletePopup(){
    this.api.deleteNoticeById(this.noticId).subscribe(resp => {
      this.closePopup();
      this.toastr.success(resp.message, "Deleted success");
      this.getNotices();
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
