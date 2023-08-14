import { Component } from '@angular/core';
import { routes } from '../../constants/routes';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarService} from './sidebar.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public routes: typeof routes = routes;
  isSubMenuOpen: boolean;
  currentUrl: string;
  menuData:any = [];
  constructor(private router: Router, private sidebarService:SidebarService)
  {
    router.events.subscribe(evt => {
      if(evt instanceof NavigationEnd) {
        this.currentUrl = evt.url;
      }
    });
    this.menuData.push(this.sidebarService.admission);
    this.menuData.push(this.sidebarService.attendance);
    this.menuData.push(this.sidebarService.fees);
    this.menuData.push(this.sidebarService.academic);
    this.menuData.push(this.sidebarService.studentList);
  }
  expandTab(match){
   return  this.currentUrl.includes(match) ? true : false;

  }
  setClass(match){
    return  this.currentUrl.includes(match) ? 'active' : '';
 
   }
}
