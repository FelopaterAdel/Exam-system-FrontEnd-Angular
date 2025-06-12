import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedCardComponent } from "../../shared/shared-card/shared-card.component";

@Component({
  selector: 'app-account',
  imports: [RouterOutlet, SharedCardComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
}
