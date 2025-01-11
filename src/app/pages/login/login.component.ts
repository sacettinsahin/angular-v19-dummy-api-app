import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { ValidationTextComponent } from "../../components/validation-text/validation-text.component";

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ValidationTextComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  loginForm!: FormGroup;
  router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    console.log('on submit');
    console.log(this.loginForm.value);

    //todo if credentials -> navigate
    this.router.navigate(['/home']);
  }
}
