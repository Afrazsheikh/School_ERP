import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-route-master',
  templateUrl: './route-master.component.html',
  styleUrls: ['./route-master.component.scss'],
})
export class RouteMasterComponent implements OnInit {
  routes: any[] = [];
  routeForm: FormGroup;
  selectedRoute: any;
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
    this.routeForm = new FormGroup({
      routeName: new FormControl(null, [Validators.required]),
      startPlace: new FormControl(null, [Validators.required]),
      stopPlace: new FormControl(null, [Validators.required]),
      remarks: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getAllRoutes();
    this.tableHeader = {
      data: [
        {
          field: 'routeName',
          dataType: 'string',
          title: 'Route Name',
          sort: true,
          visible: true,
          search: true,
        },
        {
          field: 'startPlace',
          dataType: 'string',
          title: 'Start Place',
          sort: true,
          visible: true,
          search: true,
        },
        {
          field: 'stopPlace',
          dataType: 'string',
          title: 'Stop Place',
          sort: true,
          visible: true,
          search: true,
        },
        {
          field: 'remarks',
          dataType: 'string',
          title: 'Remarks',
          sort: true,
          visible: true,
          search: true,
          width: '30%',
        },
        {
          field: 'action',
          dataType: 'action',
          title: 'Action',
          sort: false,
          visible: true,
          search: false,
          width: '15%',
        },
      ],
      searchPlaceholder: 'Search by Route Name, Start Place and Stop Place',
      sortBy: { field: 'routeName', asc: true },
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

  getAllRoutes() {
    this.api.getAllRoutes().subscribe((resp) => {
      this.routes = resp.routes;
    });
  }

  addRoute() {
    this.isLoading = true;
    this.api.addRoute(this.routeForm.value).subscribe(
      (resp) => {
        this.isLoading = false;
        this.toastr.success(resp.message, 'Route add success');
        this.routeForm.reset();
        this.getAllRoutes();
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, 'Route add failed');
      }
    );
  }

  editRoute(route: any) {
    this.selectedRoute = route;
    const navExtras: NavigationExtras = {
      state: {
        data: this.selectedRoute,
      },
    };

    this.router.navigate(
      ['/transport/route/', this.selectedRoute._id],
      navExtras
    );
  }

  deleteRoute() {
    this.isLoading = true;
    this.api.deleteRoute(this.selectedRoute._id).subscribe(
      (resp) => {
        console.log(resp);
        this.isLoading = false;
         this.closePopup();
        this.getAllRoutes();
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
      this.editRoute(this.selectedRow);
    }
    if ($event['event'] === 'delete') {
      this.openDeleteModal(this.deleteTemplate, this.selectedRow);
    }
  }
  openDeleteModal(template: TemplateRef<any>, data: any) {
    this.selectedRoute = data;
    this.modalRef = this.modalService.show(template);
  }
  closePopup() {
    this.modalRef.hide();
  }
}
