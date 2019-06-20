import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private url = 'http://localhost:3000/';

  constructor(
    private http: Http,
    
  ) { }

  request() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url)
        .subscribe(data => {
          resolve(data);
        }, (error => {
          reject(error);
        }));
    })
  }

  async get() {
    let response = { error: false, result: null }

    await this.request()
      .then(result => Object.assign(response, { result }))
      .catch(result => Object.assign(response, { error: true, result }));

    return response;
  }
}
