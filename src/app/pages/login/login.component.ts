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
import { AuthService } from '../../services/auth.service';

type LoginFormType = {
  username:string,
  password: string
}

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
  router = inject(Router);
  authService = inject(AuthService);

  loginForm!: FormGroup;


  constructor() {
    this.loginForm = this.fb.group({
      username: ['emilys', [Validators.required, Validators.minLength(4)]],
      password: ['emilyspass', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(form:LoginFormType): void {
     //todo if credentials -> navigate

    this.authService.login(form.username, form.password).subscribe(
      (res)=> {
        console.log(res);
        localStorage.setItem('token', res.accessToken);
        this.router.navigate(['/home']);
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
