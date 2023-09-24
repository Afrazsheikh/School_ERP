import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiEndPointConstant } from '../constants/ApiEndPointConstant';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService{

  constructor(private httpClient: HttpClient) {
    super()
  }

  getAllVehicle(): Observable<any> {
    return this.httpClient
      .get(`${environment.apiBaseUrl}${ApiEndPointConstant.GET_ALL_VEHICLE}` )
      .pipe(catchError(this.errorHandler));
  }
  getAllReception(): Observable<any> {
    return this.httpClient
      .get(`${environment.apiBaseUrl}${ApiEndPointConstant.GET_ALL_RECEPTION}` )
      .pipe(catchError(this.errorHandler));
  }
  getAllAttendance(): Observable<any> {
    return this.httpClient
      .get(`${environment.apiBaseUrl}${ApiEndPointConstant.GET_ALL_ATTENDANCE}` )
      .pipe(catchError(this.errorHandler));
  }
}
