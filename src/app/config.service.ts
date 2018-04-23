import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigService {
  dataUrl = 'assets/datajitsu-export.json';

  constructor(private http: HttpClient) { }

  getConfig(): Observable<HttpResponse>{
    return this.http.get(this.dataUrl, {observe: 'response'});
  }
}
