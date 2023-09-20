import { Component, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent {
  banners: any[] = [];
  modalRef!: BsModalRef;
  bannerId:any;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,private modalService: BsModalService) {
    
  }
  ngOnInit(){
    this.getBanners();
  }
  
  getBanners() {
    this.api.getBanners().subscribe((resp) => {
      this.banners = resp.allBanner;
    });
  }
  addBtnClick(){
    this.router.navigate(['/parent/banner-add']);
  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.bannerId = data._id;
    this.modalRef = this.modalService.show(template);
  }
  deletePopup(){
    this.api.deleteBannerById(this.bannerId).subscribe(resp => {
      console.log(resp);
      
      this.closePopup();
      this.toastr.success(resp.message, "Deleted success");
      this.getBanners();
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
