import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { resultService } from '../../../services/result.service';
import { IExamResult } from '../../../models/IExamResult';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-result',
  imports: [CommonModule],
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent implements OnInit {
  examId: string = '';
  examResult!: IExamResult;
  loading: boolean = true;
  error: string = '';
  showDetailedReview: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultService: resultService
  ) { }

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['id'];
    this.loadExamResult();

  }

  loadExamResult(): void {
    this.loading = true;
    this.error = '';

    this.resultService.getResult(this.examId).subscribe({
      next: (response: any) => {
        this.examResult = response.result;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load exam results. Please try again.';
        this.loading = false;
        console.error('Error loading exam result:', err);
      }
    });
  }

  getScoreClass(): string {
    if (!this.examResult) return '';
    if (this.examResult.passed) return 'passed';
    return 'failed';
  }

  getStatusIcon(): string {
    if (!this.examResult) return 'fa-question';
    return this.examResult.passed ? 'fa-trophy' : 'fa-times';
  }

  getStatusText(): string {
    if (!this.examResult) return 'Unknown';
    return this.examResult.passed ? 'PASSED' : 'FAILED';
  }

  toggleDetailedReview(): void {
    this.showDetailedReview = !this.showDetailedReview;
  }

  reTakeExam(): void {
    if (confirm('Are you sure you want to retake this exam? This will start a new attempt.')) {
      this.router.navigate(['/exams', this.examId, 'take']);
    }
  }


  goBack(): void {
    this.router.navigate(['/exams']);
  }
}