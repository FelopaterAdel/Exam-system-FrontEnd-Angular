import { AuthService } from './../../../services/AuthService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedCardComponent } from '../../../shared/shared-card/shared-card.component';
import { examService } from '../../../services/exam.service';
import { IExam } from '../../../models/IExam';
import { Router } from '@angular/router';
@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [ReactiveFormsModule, SharedCardComponent, CommonModule],
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {
  examId: any;
  examForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private examService: examService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private AuthService:AuthService

  ) { }

  ngOnInit(): void {
    console.log( this.AuthService.getUserId() )
    this.examForm = this.fb.group({
      title: new FormControl('', Validators.required),
      teacherId : this.AuthService.getUserId() ,
      students: this.fb.array([this.fb.control('', Validators.required)]),
      questions: this.fb.array([this.createQuestionGroup()])
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.examId = params.get('id');

      if (this.examId) {
        this.examService.getExamById(this.examId).subscribe((response) => {
          this.questions.clear();
          this.students.clear();

          this.examForm.patchValue({
            title: response.title,
            teacherId: response.teacherId
          });

          response.questions.forEach(q => {
            const questionGroup = this.createQuestionGroup();
            const optionsArray = questionGroup.get('options') as FormArray;

            optionsArray.clear();

            q.options.forEach(opt => {
              optionsArray.push(this.fb.control(opt, Validators.required));
            });

            questionGroup.patchValue({
              _id: q._id,
              question: q.question,
              correctAnswer: q.correctAnswer
            });

            this.questions.push(questionGroup);
          });

          response.students.forEach(student => {
            this.students.push(this.fb.control(student, Validators.required));
          });
        });
      }
    });
  }

  get questions(): FormArray {
    return this.examForm.get('questions') as FormArray;
  }

  get students(): FormArray {
    return this.examForm.get('students') as FormArray;
  }
  get getTitle() {
    return this.examForm.controls['title'];
  }
  get getteacherId() {
    return this.examForm.controls['teacherId'];
  }


  createQuestionGroup(): FormGroup {
    return this.fb.group({
      //  _id: [''], // Add this line
      question: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      correctAnswer: [0, Validators.required]
    });
  }
  addQuestion(): void {
    this.questions.push(this.createQuestionGroup());
  }

  addOption(questionIndex: number): void {
    const options = this.getOptions(questionIndex);
    options.push(this.fb.control('', Validators.required));
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  addStudent(): void {
    this.students.push(this.fb.control('', Validators.required));
  }

  submitExam(): void {
    if (this.examForm.valid) {
      const examData: IExam = this.examForm.value;
      if (this.examId == 0) {
        this.examService.createExam(examData).subscribe({
          next: res => {
            this.router.navigate(['/exams'])
            console.log('Exam created:', res)
          },
          error: err => console.error('Error:', err)
        });
      } else {
        this.examService.editExam(this.examId, examData).subscribe({
          next: res => {
            this.router.navigate(['/exams'])
            console.log('Exam updated:', res)
          },
          error: err => console.error('Error:', err)
        });
      }

    } else {
      console.warn('Form is invalid!');
      this.examForm.markAllAsTouched();
    }
  }
}
