import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AuthService {
  public isAuthenticated(): boolean {
    const auth = StorageService.get('auth');
    return (auth != null);
  }
}