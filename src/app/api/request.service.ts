import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private api = 'http://127.0.0.1:3333/api';

  constructor(
    private http: Http,
    private spinner: NgxSpinnerService
  ) { }

  request(url: string = null, method: string = 'get', body = null, headers = null, params = null) {
    return new Promise((resolve, reject) => {
      this.http.request(url, {
        method,
        body,
        params
      }).subscribe(data => {
        resolve(data.json());
      }, (error => {
        reject(error);
      }));
    })
  }

  async default(url: string = null, useApi: boolean = true, method: string = 'GET', body = null, headers = null, params = null) {
    let response = { error: false, result: null }
    let urlRequest = (useApi) ? this.api.concat(url) : url;
    this.spinner.show();

    await this.request(urlRequest, method, body, headers, params)
      .then(result => Object.assign(response, { result }))
      .catch(result => Object.assign(response, { error: true, result }))
      .finally(() => this.spinner.hide())

    return response;
  }
}
