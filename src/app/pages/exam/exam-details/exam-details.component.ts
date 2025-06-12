// exam-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { examService } from '../../../services/exam.service';
import { IExam } from '../../../models/IExam';
import { CommonModule } from '@angular/common';
import { SharedCardComponent } from '../../../shared/shared-card/shared-card.component';

@Component({
  selector: 'app-exam-details',
  imports:[CommonModule],
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css']
})
export class ExamDetailsComponent implements OnInit {
  exam!: IExam;
  examId!: any;

  constructor(
    private route: ActivatedRoute,
    private examService: examService
  ) { }

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id');
    this.loadExam();
  }

  loadExam(): void {
    this.examService.getExamById(this.examId).subscribe(exam => {
      this.exam = exam;
    });
  }
  toChar(code: number): string {
    return String.fromCharCode(code);
  }

}