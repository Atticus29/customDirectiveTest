import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  dataUrl = 'assets/datajitsu-export.json';

  constructor(private http: HttpClient) { }

  getConfig(){
    return this.http.get(this.dataUrl);
  }
}
