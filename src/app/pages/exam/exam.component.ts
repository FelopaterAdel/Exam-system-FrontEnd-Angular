import { AuthService } from './../../services/AuthService';
import { Component, OnInit } from '@angular/core';
import { examService } from '../../services/exam.service';
import { IExam } from '../../models/IExam';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedCardComponent } from '../../shared/shared-card/shared-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-exam',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SharedCardComponent,],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})

export class ExamComponent {
  exams!: IExam[];
  token: string = '';
  errorMessage: string = '';
  isTeacher: boolean = false;
  isStudent:boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private examService: examService,
    private snackBar: MatSnackBar,
    private authService: AuthService,

  ) {}
  ngOnInit(): void {
    this.isTeacher = this.authService.isTeacher();
    this.isStudent = this.authService.isStudent();
    console.log(this.authService.getUserRole())
    this.examService.getAllExams().subscribe({

      next: res => {
        this.exams = res;
        console.log(this.exams);
        console.log('success');
      },
      error: err => {
        this.errorMessage = err?.error?.message || 'Failed to load exams';
        console.log(err);
      }
    });
  }
  deleteHandler(examId: string) {
    if (confirm('Are you sure you want to delete this exam?')) {
      this.examService.deleteExam(examId).subscribe({
        next: () => {
          this.refreshExamList();

          this.exams = this.exams.filter(exam => exam._id !== examId);

          this.snackBar.open('Exam deleted successfully', 'Close', { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open('Failed to delete exam', 'Close', { duration: 3000 });
        }
      });
    }
  }
  refreshExamList() {
    this.examService.getAllExams().subscribe({
      next: (exams) => {
        this.exams = exams;
      },
      error: (err) => console.error('Error fetching exams', err)
    });
  }



}

