import { Component } from '@angular/core';
import { Router, RouterOutlet,NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component'
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,HeaderComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showHeader = true;
  title = 'Exam';
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.activatedRoute.firstChild;
      let hideHeader = false;
      
      while (currentRoute) {
        if (currentRoute.snapshot.data['hideHeader']) {
          hideHeader = true;
          break;
        }
        currentRoute = currentRoute.firstChild;
      }
      
      this.showHeader = !hideHeader;
    });
  }

}
