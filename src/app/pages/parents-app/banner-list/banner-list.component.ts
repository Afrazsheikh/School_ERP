import { Component, TemplateRef, ViewChild } from '@angular/core';
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
  selectedRow:any;
  tableHeader:any;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,private modalService: BsModalService) {
    
  }
  ngOnInit(){
    this.getBanners();
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "bannerName", dataType: "string", title: 'Name', sort: true, visible: true, search:true },
        {  field: "bannerImage", dataType: "img", title: 'Banner Image', sort: false, visible: true, search:false },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
       ],
      searchPlaceholder:"Search by Name",
      sortBy: { field: 'bannerName', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {        
       
          delete: {
            show: true,
            callback: () => {
  
            },
          },
        },
      },
    }
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
    const payload = {
      id:this.bannerId
    }
    this.api.deleteBannerById(payload).subscribe(resp => {
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
  rowEvent($event: any) {
    this.selectedRow = $event.lead;   
    if($event['event'] === 'delete'){
      this.openDeleteModal(this.deleteTemplate, this.selectedRow)
    }

  }
}
