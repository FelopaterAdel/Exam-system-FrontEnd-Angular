import { resultService } from './../../../services/result.service';
import { AuthService } from './../../../services/AuthService';
import { examService } from './../../../services/exam.service';
import { IExam } from './../../../models/IExam';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedCardComponent } from '../../../shared/shared-card/shared-card.component';

@Component({
  imports: [CommonModule, SharedCardComponent, ReactiveFormsModule],
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {
  exam!: IExam;
  examId: any = '';
  examForm !: FormGroup;
  studentId: any = '';
  isSubmitting: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private examService: examService,
    private fb: FormBuilder,
    private authService: AuthService,
    private resultService: resultService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.studentId = this.authService.getUserId()
    this.examId = this.route.snapshot.paramMap.get('id');
    this.loadExam();
  }

  loadExam(): void {
    this.examService.getExamById(this.examId).subscribe(exam => {
      this.exam = exam;
      this.createForm();
    });
  }

  createForm(): void {
    this.examForm = this.fb.group({
      studentId: [this.studentId, Validators.required],
      answers: this.fb.array([])
    });

    this.exam.questions.forEach((question, i) => {
      this.answers.push(this.fb.control(null, Validators.required));
    });
  }

  get answers(): FormArray {
    return this.examForm.get('answers') as FormArray;
  }
  getResult() {
    return this.resultService.getResult;
  }
  showErrorMessage(message: string): void {
    alert(message); 
  }
  submitExam(): void {
    const answers = this.examForm.value.answers;
    if (!this.examForm.valid) {
      console.error('Form is not valid');
      return;
    }

    if (!answers || answers.length === 0) {
      console.error('No answers to submit');
      return;
    }

    this.isSubmitting = true; 

    this.resultService.submitExam(this.examId, answers).subscribe({
      next: (result) => {
        console.log('Exam submitted successfully:', result);
        this.isSubmitting = false;
        this.router.navigate(['/exams', this.examId, 'result']);
      },
      error: (err) => {
        console.error('Exam submission failed:', err);
        this.isSubmitting = false;
        this.showErrorMessage('Failed to submit exam. Please try again.');
      }
    });
  }
}
