import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {

    const isAuthenticated = !!localStorage.getItem('token');
    if (isAuthenticated) {
      this.router.navigate(['/users']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });


  }


  get f() {
    return this.loginForm.controls;
  }
  register(){
    this.router.navigate(['/register']);
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    let data = {
      "email":this.loginForm.value.email,
      "password":this.loginForm.value.password,
    }
    this.userService.login(data).then((result: any) => {
      if (result.status == 'SUCCESS') {
        localStorage.setItem('name', result.name);
        localStorage.setItem('id', result.id);
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);
        // this.router.navigate(['/users']);
        window.location.href = "/users";
      }else{
        alert(result.message);
      }
    });

  }
}
