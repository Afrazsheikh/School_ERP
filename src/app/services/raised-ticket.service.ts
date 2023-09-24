import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { ApiEndPointConstant } from '../constants/ApiEndPointConstant';

@Injectable({
  providedIn: 'root'
})
export class RaisedTicketService extends BaseService{

  constructor(private httpClient: HttpClient) {
    super()
  }

  getRaiseTicketTeacher(): Observable<any> {
    return this.httpClient
      .get(`${environment.apiBaseUrl}${ApiEndPointConstant.GET_RAISED_TICKET_TEACHER}` )
      .pipe(catchError(this.errorHandler));
  }


}
