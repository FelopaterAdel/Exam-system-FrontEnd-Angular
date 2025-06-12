import { Component } from '@angular/core';
import { authorezationService } from '../../../services/authorezation'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(private router:Router, private fb: FormBuilder, private registerService: authorezationService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }
  get passwordMismatch(): boolean {
    const { password, confirmPassword } = this.registerForm.value;
    return password && confirmPassword && password !== confirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid && !this.passwordMismatch) {
      const { name, email, password, role } = this.registerForm.value;
      const user: User = { name, email, password, role };

      this.registerService.registration(user).subscribe({
        next: res =>{
          this.successMessage = 'Registration successful! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['account/login']);
          }, 2000);
          console.log('Registered successfully:', res)
        },
        error: err => {
          this.errorMessage = err?.error?.message || 'An error occurred during registration.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}