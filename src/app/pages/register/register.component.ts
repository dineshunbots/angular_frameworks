import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {




  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],  // Validating for 10 digits
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['User', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const user: any = this.registerForm.value;
    this.userService.register(user).then((result: any) => {
      if (result.status = 'SUCCESS') {
        this.router.navigate(['/login']);
      }else{
        alert(result.message);
      }
    });
  }
}
