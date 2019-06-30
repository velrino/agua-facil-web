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

  request(url: string = null) {
    let actualUrl = (url != null) ? url : this.url;
    return new Promise((resolve, reject) => {
      this.http.get(actualUrl)
        .subscribe(data => {
          resolve(data.json());
        }, (error => {
          reject(error);
        }));
    })
  }

  async default(url: string = null) {
    let response = { error: false, result: null }

    await this.request(url)
      .then(result => Object.assign(response, { result }))
      .catch(result => Object.assign(response, { error: true, result }));

    return response;
  }
}
