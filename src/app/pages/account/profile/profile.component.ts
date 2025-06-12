import { authorezationService } from './../../../services/authorezation';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/User';
// User interface

@Component({
  selector: 'app-profile',
  imports:[CommonModule , FormsModule],
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
  ) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authorezationService.getUser().subscribe(user =>this.user = user)
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
      // Cancel editing - restore original data
      this.user = { ...this.originalUser };
    }
    this.isEditing = !this.isEditing;
  }

  // Save profile changes
  saveProfile(): void {
    // Here you would typically call your user service to update the profile
    // Example: this.userService.updateProfile(this.user).subscribe(...)
    
    console.log('Saving profile:', this.user);
    this.originalUser = { ...this.user };
    this.isEditing = false;
    
    // Show success message (you can implement toast/snackbar here)
    alert('Profile updated successfully!');
  }

  // Get role display text
  getRoleDisplayText(): string {
    return this.user.role.charAt(0).toUpperCase() + this.user.role.slice(1);
  }

  // Navigate back to dashboard
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  // Logout functionality
  logout(): void {
    // Implement your logout logic here
    // Example: this.authService.logout();
    this.router.navigate(['/login']);
  }
}