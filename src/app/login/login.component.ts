import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiLoginService } from '../api/api/login.service';
import { StorageService } from '../api/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiLoginService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private apiLoginService: ApiLoginService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async makeLogin() {
    const { email, password } = this.loginForm.controls;

    if (this.loginForm.invalid) {
      const validValue = "VALID";
      if (email.status != validValue || password.status != validValue) {
        this.toastr.error('E-mail ou senha incorreto');
      }
    } else if (this.loginForm.valid) {

      const data = await this.apiLoginService.makeLogin(email.value, password.value);

      if (data.error) {
        this.toastr.error('E-mail ou senha incorreto');
      } else {
        StorageService.set('auth', data.result)
        this.router.navigate(['/admin']);
      }
    }
  }

}
