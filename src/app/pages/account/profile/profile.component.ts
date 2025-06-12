import { AuthService } from './../../../services/AuthService';
import { authorezationService } from './../../../services/authorezation';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/User';
@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    password: '',
    role: 'student'
  };

  isEditing: boolean = false;
  originalUser: User = { ...this.user };

  constructor(
    private router: Router,
    private authorezationService: authorezationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authorezationService.getUser().subscribe(user => this.user = user)
    this.user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '********',
      role: 'student'
    };
    this.originalUser = { ...this.user };
  }

  // Toggle edit mode
  toggleEdit(): void {
    if (this.isEditing) {
      this.user = { ...this.originalUser };
    }
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {

    console.log('Saving profile:', this.user);
    this.originalUser = { ...this.user };
    this.isEditing = false;

    alert('Profile updated successfully!');
  }

  getRoleDisplayText(): string {
    return this.user.role.charAt(0).toUpperCase() + this.user.role.slice(1);
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/account/login']);
  }
}