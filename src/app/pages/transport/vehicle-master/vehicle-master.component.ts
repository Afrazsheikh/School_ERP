import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['./vehicle-master.component.scss']
})
export class VehicleMasterComponent implements OnInit {

  vehicles: any[] = [];
  vehicleForm: FormGroup;
  selectedVehicle: any;
  isLoading: boolean;

  constructor(private api: ApiService, private toastr: ToastrService, private router: Router)
  {
    this.vehicleForm = new FormGroup({
      vehicleNo: new FormControl(null, [Validators.required]),
      capacity: new FormControl(null, [Validators.required]),
      insuranceRenewalDate: new FormControl(null, [Validators.required]),
      driverName: new FormControl(null, [Validators.required]),
      driverPhoneNo: new FormControl(null, [Validators.required]),
      driverLicense: new FormControl(null, [Validators.required])
      driverLicense: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles()
  {
    this.api.getAllVehicles().subscribe(resp => {
      this.vehicles = resp.vehicles;
    });
  }

  addVehicle()
  {
    this.isLoading = true;
    this.vehicleForm.value.insuranceRenewalDate = moment(this.vehicleForm.value.insuranceRenewalDate).format("MM/DD/YYYY");
    this.api.addVehicle(this.vehicleForm.value).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, "Vehicle add success");
      this.vehicleForm.reset();
      this.getAllVehicles();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Vehicle add failed");
    });
  }

  editVehicle(route: any)
  {
    this.selectedVehicle = route;
    const navExtras: NavigationExtras = {
      state: {
        data: this.selectedVehicle
      }
    };

    this.router.navigate(["/transport/vehicle/", this.selectedVehicle._id], navExtras);
  }

  deleteVehicle()
  {
    this.isLoading = true;
    this.api.deleteVehicle(this.selectedVehicle._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      document.getElementById('modalDismissBtn')?.click();
      this.getAllVehicles();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
}
