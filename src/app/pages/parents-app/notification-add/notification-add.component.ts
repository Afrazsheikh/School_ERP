import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notification-add',
  templateUrl: './notification-add.component.html',
  styleUrls: ['./notification-add.component.scss']
})
export class NotificationAddComponent {
  notificationForm: FormGroup;
  types = ['guardian', 'teacher'];
  isLoading: boolean;
  constructor(private api: ApiService, private toastr: ToastrService,private router: Router) {
    
  }
  ngOnInit(){
    this.notificationForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    });

  }
  addNotification() {
    this.api.addNotification(this.notificationForm.value).subscribe(
      (resp) => {
        this.toastr.success(resp.message, 'Notification add success');
        this.notificationForm.reset();
        this.backBtnClick();
      },
      (err) => {
        this.toastr.error(err, 'Notification add failed');
      }
    );
  }
  backBtnClick(){
    this.router.navigate(['/parent/notification-list']);
  }
}
