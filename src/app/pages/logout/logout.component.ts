import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor( public router: Router, public authService:AuthService) {
         
  }
  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
