import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/AuthService';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isTeacher: boolean = false;
  isStudent:boolean = false;
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.isTeacher = this.authService.isTeacher();
    this.isStudent = this.authService.isStudent();
    console.log(this.authService.getUserRole())
  }
  logout() {
    this.authService.removeToken();
    this.router.navigate(['/account/login']);
  }
}
