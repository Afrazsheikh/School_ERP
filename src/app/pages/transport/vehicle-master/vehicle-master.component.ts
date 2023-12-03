import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['./vehicle-master.component.scss'],
})
export class VehicleMasterComponent implements OnInit {
  vehicles: any[] = [];
  vehicleForm: FormGroup;
  selectedVehicle: any;
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
    this.vehicleForm = new FormGroup({
      vehicleNo: new FormControl(null, [Validators.required]),
      capacity: new FormControl(null, [Validators.required]),
      insuranceRenewalDate: new FormControl(null, [Validators.required]),
      driverName: new FormControl(null, [Validators.required]),
      driverPhoneNo: new FormControl(null, [Validators.required]),
      driverLicense: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllVehicles();
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
          field: 'vehicleNo',
          dataType: 'string',
          title: 'Vehicle No.',
          sort: true,
          visible: true,
          search: true,
        },
        {
          field: 'capacity',
          dataType: 'string',
          title: 'Capacity',
          sort: true,
          visible: true,
          search: true,
        },
        {
          field: 'insuranceRenewalDate',
          dataType: 'date',
          title: 'Insurance Renewal Date',
          sort: true,
          visible: true,
          search: true,
          width: '13%',
        },
        {
          field: 'driverName',
          dataType: 'string',
          title: 'Driver Name',
          sort: true,
          visible: true,
          search: true,
          width: '13%',
        },
        {
          field: 'driverPhoneNo',
          dataType: 'string',
          title: 'Driver Phone No.',
          sort: true,
          visible: true,
          search: true,
        },
        {
          field: 'driverLicense',
          dataType: 'string',
          title: 'Driver License',
          sort: true,
          visible: true,
          search: true,
          width: '8%',
        },
        {
          field: 'action',
          dataType: 'action',
          title: 'Action',
          width: '13%',
          sort: false,
          visible: true,
          search: false,
        },
      ],
      searchPlaceholder:
        'Search by Vehicle No, Capacity,Driver Name and Driver Phone No.',
      sortBy: { field: 'vehicleNo', asc: true },
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

  getAllVehicles() {
    this.api.getAllVehicles().subscribe((resp) => {
      this.vehicles = resp.vehicles;
    });
  }

  addVehicle() {
    this.isLoading = true;
    this.vehicleForm.value.insuranceRenewalDate = moment(
      this.vehicleForm.value.insuranceRenewalDate
    ).format('MM/DD/YYYY');
    this.api.addVehicle(this.vehicleForm.value).subscribe(
      (resp) => {
        this.isLoading = false;
        this.toastr.success(resp.message, 'Vehicle add success');
        this.vehicleForm.reset();
        this.getAllVehicles();
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, 'Vehicle add failed');
      }
    );
  }

  editVehicle(route: any) {
    this.selectedVehicle = route;
    const navExtras: NavigationExtras = {
      state: {
        data: this.selectedVehicle,
      },
    };

    this.router.navigate(
      ['/transport/vehicle/', this.selectedVehicle._id],
      navExtras
    );
  }

  deleteVehicle() {
    this.isLoading = true;
    this.api.deleteVehicle(this.selectedVehicle._id).subscribe(
      (resp) => {
        console.log(resp);
        this.isLoading = false;
        this.toastr.success(resp.message, 'Vehicle Deleted');
        this.closePopup();
        this.getAllVehicles();
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
      this.editVehicle(this.selectedRow);
    }
    if ($event['event'] === 'delete') {
      this.openDeleteModal(this.deleteTemplate, this.selectedRow);
    }
  }

  openDeleteModal(template: TemplateRef<any>, data: any) {
    this.selectedVehicle = data;
    this.modalRef = this.modalService.show(template);
  }
  closePopup() {
    this.modalRef.hide();
  }
}
