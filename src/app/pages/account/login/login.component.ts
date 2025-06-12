import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { authorezationService } from '../../../services/authorezation'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/AuthService';
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(
    private router:Router,
    private fb: FormBuilder, 
    private loginService: authorezationService,
    private auth:AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
     
    })
  }
  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.loginService.login(email, password).subscribe({
      next: res => {
        this.successMessage =" login successful "
        this.auth.saveToken(res.token);
        console.log(this.auth.currentToken)
        setTimeout(()=>{
          this.router.navigate(['/exams'])
        })
        console.log('login successfully:', res)},
      error: err =>{
          this.errorMessage = err?.error?.message || 'An error occurred during registration.';
        }
    })
  }

}
