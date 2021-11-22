import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class ApiHttpService {
  constructor(private http: HttpClient) { }

  public get<T>(url: string, options?: any) {
    return this.http.get<T>(url, this.getHttpHeader(options));
  }

  public getHttpHeader(options: any): any {
    let headers = new HttpHeaders();
    headers = headers.append('Charset', 'UTF-8');
    const option = {
      headers: headers,
      observe: 'response',
    };

    return option;
  }
}
