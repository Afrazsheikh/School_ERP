import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginFG!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService,
    private _router: Router,
    private authService:AuthService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.loginFG = this.formBuilder.group({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onLogin() {
    this.api.loginMethod(this.loginFG.value).subscribe({
      next: (res) => {
        const resData = res[0]['data'];
        const userInfo = {
          "id": resData._id,
          "contactName": resData.name,
          "phoneNumber": resData.number,
          "userEmail": resData.email
        };
        this.authService.setToken(res.authToken,userInfo);
        this.toastr.success('Logged-In Successfully!');
        this._router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
}
