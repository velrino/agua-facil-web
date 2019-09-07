import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class ApiLoginService {
  constructor(
    private requestService: RequestService
  ) { }

  async makeLogin(email: string, password: string) {
    const result = await this.requestService.default('/auth/login', true, 'post', {
      email,
      password
    });
    return result;
  }
}