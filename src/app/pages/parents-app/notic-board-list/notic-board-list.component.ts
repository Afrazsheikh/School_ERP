import { Component, TemplateRef } from '@angular/core';
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
  constructor(private api: ApiService, private toastr: ToastrService,private router: Router,private modalService: BsModalService) {
    
  }
  ngOnInit(){
    this.getNotices();
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
}
