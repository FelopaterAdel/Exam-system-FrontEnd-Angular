import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';

@Component({
  selector: 'app-exam-card',
  imports: [RouterLink,FormsModule],
  templateUrl: './exam-header.component.html',
  styleUrl: './exam-header.component.css'
})
export class ExamHeaderComponent {
constructor(private router: Router) {}
  

  filterBy() {
    this.router.navigate(['/exams'], {

    });
  }
}
