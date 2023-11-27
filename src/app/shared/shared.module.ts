import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './pipe/filter.pipe';
import { SearchBoxComponent } from './search-box/search-box.component';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { ActionButtonItemComponent } from './action-button-item/action-button-item.component';

@NgModule({
  declarations: [FilterPipe,LayoutComponent, HeaderComponent, SidebarComponent, SearchBoxComponent, DynamicTableComponent, ActionButtonItemComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    RouterModule,
    MatMenuModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    OrderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [LayoutComponent, SidebarComponent, HeaderComponent, NgxPaginationModule,FilterPipe, SearchBoxComponent, OrderModule, DynamicTableComponent],
})
export class SharedModule {}
