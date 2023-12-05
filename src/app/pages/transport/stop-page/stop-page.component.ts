import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-stop-page',
  templateUrl: './stop-page.component.html',
  styleUrls: ['./stop-page.component.scss'],
})
export class StopPageComponent {
  stopPages: any[] = [];
  stopForm: FormGroup;
  selectedStop: any;
  isLoading: boolean;
  selectedRow: any;
  tableHeader: any;
  modalRef!: BsModalRef;
  @ViewChild('deletemplate', { read: TemplateRef })
  deleteTemplate: TemplateRef<any>;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.stopForm = new FormGroup({
      stoppageName: new FormControl(null, [Validators.required]),
      stopTime: new FormControl(null, [Validators.required]),
      routeFare: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllStopPages();
    this.tableHeader = {
      data: [
        {
          field: 'autoNo',
          dataType: 'autoNo',
          title: 'S. No',
          sort: false,
          visible: true,
          search: false,
        },
        {
          field: 'stoppageName',
          dataType: 'string',
          title: 'Stop Page',
          sort: true,
          visible: true,
          search: true,
        },
        {
          field: 'stopTime',
          dataType: 'string',
          title: 'Stop Time',
          sort: true,
          visible: true,
          search: true,
        },
        {
          field: 'routeFare',
          dataType: 'string',
          title: 'Route Fare',
          sort: true,
          visible: true,
          search: true,
        },
        {
          field: 'action',
          dataType: 'action',
          title: 'Action',
          sort: false,
          visible: true,
          search: false,
          width: '13%',
        },
      ],
      searchPlaceholder: 'Search by Stop Page, Stop Time and Route Fare',
      sortBy: { field: 'stoppageName', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {
          edit: {
            show: true,
            callback: () => {},
          },
          delete: {
            show: true,
            callback: () => {
              // $('#detail-grievance').modal('show')
            },
          },
        },
      },
    };
  }

  getAllStopPages() {
    this.api.getAllStopPages().subscribe((resp) => {
      this.stopPages = resp.stoppages;
    });
  }

  addStopPage() {
    this.isLoading = true;
    this.api.addStopPage(this.stopForm.value).subscribe(
      (resp) => {
        this.isLoading = false;
        this.toastr.success(resp.message, 'Stop Page add success');
        this.stopForm.reset();
        this.getAllStopPages();
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, 'Stop Page add failed');
      }
    );
  }

  editStopPage(stopPage: any) {
    this.selectedStop = stopPage;
    const navExtras: NavigationExtras = {
      state: {
        data: this.selectedStop,
      },
    };

    this.router.navigate(
      ['/transport/stop/', this.selectedStop._id],
      navExtras
    );
  }

  deleteStopPage() {
    this.isLoading = true;
    this.api.deleteStopPage(this.selectedStop._id).subscribe(
      (resp) => {
        console.log(resp);
        this.isLoading = false;
        this.closePopup();
        this.toastr.success(resp.message, 'Stop Page Deleted');
        this.getAllStopPages();
      },
      (err) => {
        this.isLoading = false;
        console.error(err);
      }
    );
  }

  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if ($event['event'] === 'edit') {
      this.editStopPage(this.selectedRow);
    }
    if ($event['event'] === 'delete') {
      this.openDeleteModal(this.deleteTemplate, this.selectedRow);
    }
  }
  openDeleteModal(template: TemplateRef<any>, data: any) {
    this.selectedStop = data;
    this.modalRef = this.modalService.show(template);
  }
  closePopup() {
    this.modalRef.hide();
  }
}
