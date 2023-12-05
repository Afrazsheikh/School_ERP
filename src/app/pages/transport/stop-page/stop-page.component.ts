import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-stop-page',
  templateUrl: './stop-page.component.html',
  styleUrls: ['./stop-page.component.scss']
})
export class StopPageComponent {

  stopPages: any[] = [];
  stopForm: FormGroup;
  selectedStop: any;
  isLoading: boolean;

  constructor(private api: ApiService, private toastr: ToastrService, private router: Router)
  {
    this.stopForm = new FormGroup({
      stoppageName: new FormControl(null, [Validators.required]),
      stopTime: new FormControl(null, [Validators.required]),
      routeFare: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getAllStopPages();
  }

  getAllStopPages()
  {
    this.api.getAllStopPages().subscribe(resp => {
      this.stopPages = resp.stoppages;
    });
  }

  addStopPage()
  {
    this.isLoading = true;
    this.api.addStopPage(this.stopForm.value).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, "Stop Page add success");
      this.stopForm.reset();
      this.getAllStopPages();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Stop Page add failed");
    });
  }

  editStopPage(stopPage: any)
  {
    this.selectedStop = stopPage;
    const navExtras: NavigationExtras = {
      state: {
        data: this.selectedStop
      }
    };

    this.router.navigate(["/transport/stop/", this.selectedStop._id], navExtras);
  }

  deleteStopPage()
  {
    this.isLoading = true;
    this.api.deleteStopPage(this.selectedStop._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      document.getElementById('modalDismissBtn')?.click();
      this.getAllStopPages();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
}
