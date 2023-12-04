import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent {

  vehicleId: string;
  editVehicle: any;
  vehicleForm: FormGroup;
  isLoading: boolean;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  )
  {
    route.params.subscribe(param => {
      if(router.getCurrentNavigation()?.extras.state) {
        this.editVehicle = router.getCurrentNavigation()?.extras.state?.['data'];
        this.vehicleId = this.editVehicle._id;
        this.createForm();
      }
    });
  }

  ngOnInit(): void {}

  createForm()
  {
    this.vehicleForm = new FormGroup({
      vehicleNo: new FormControl(this.editVehicle.vehicleNo, [Validators.required]),
      capacity: new FormControl(this.editVehicle.capacity, [Validators.required]),
      insuranceRenewalDate: new FormControl(this.editVehicle.insuranceRenewalDate, [Validators.required]),
      driverName: new FormControl(this.editVehicle.driverName, [Validators.required]),
      driverPhoneNo: new FormControl(this.editVehicle.driverPhoneNo, [Validators.required]),
      driverLicense: new FormControl(this.editVehicle.driverLicense, [Validators.required]),
      cleanderName: new FormControl(this.editVehicle?.cleanderName),
      cleanerPhone: new FormControl(this.editVehicle?.cleanerPhone),
    });
  }

  updateVehicle()
  {
    this.isLoading = true;
    this.vehicleForm.value.insuranceRenewalDate = moment(this.vehicleForm.value.insuranceRenewalDate).format("MM/DD/YYYY");
    this.api.updateVehicle(this.vehicleId, this.vehicleForm.value).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, "Vehicle update success");
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Vehicle update failed");
    });
  }
}
