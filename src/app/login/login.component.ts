import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiLoginService } from '../api/api/login.service';

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
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  makeLogin() {
    const { email, password } = this.loginForm.controls;

    if (this.loginForm.invalid) {
      const validValue = "VALID";
      if (email.status != validValue || password.status != validValue) {
        this.toastr.error('E-mail ou senha incorreto');
      }
    } else if (this.loginForm.valid) {
      this.apiLoginService.makeLogin(email.value, password.value);
    }
  }

}
