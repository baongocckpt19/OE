import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trangthi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trangthi.component.html',
  styleUrl: './trangthi.component.scss'
})
export class TrangthiComponent implements OnInit {
  exam = {
    examName: 'Đề thi giữa kỳ I',
    subject: 'Toán 12',
    duration: 45,
    description: 'Đề thi trắc nghiệm Toán 12 chương I – hàm số, đạo hàm, cực trị, GTLN-GTNN.'
  };

  questions: any[] = [];
  selectedAnswers: (number | null)[] = [];
  flaggedQuestions: boolean[] = [];

  timeLeft: number = 0;
  displayTime: string = '00:00';
  timerInterval: any;

  ngOnInit(): void {
    this.generateMockQuestions();
    this.selectedAnswers = Array(this.questions.length).fill(null);
    this.flaggedQuestions = Array(this.questions.length).fill(false);
    this.startTimer();
  }

  generateMockQuestions() {
    const topics = [
      'Đạo hàm của hàm số y = x^2 là gì?',
      'Hàm số y = sin(x) đạt cực đại tại đâu?',
      'Giá trị lớn nhất của hàm y = -x^2 + 4x + 1 là?',
      'Tập xác định của hàm y = √(x-2)?',
      'Hàm số đồng biến trên khoảng nào?',
      'Tìm x sao cho y = x^3 - 3x + 2 đạt GTNN?',
      'Đồ thị hàm số y = x^2 + 2x + 1 có trục đối xứng là?',
      'Giá trị nhỏ nhất của hàm y = cos(x) là?',
      'Số nghiệm của phương trình y = x^2 - 4 = 0?',
      'Hàm số y = |x| có đạo hàm tại x = 0 không?'
    ];

    this.questions = Array.from({ length: 50 }, (_, i) => ({
      question: `Câu ${i + 1}: ${topics[i % topics.length]}`,
      answers: ['A. Đáp án 1', 'B. Đáp án 2', 'C. Đáp án 3', 'D. Đáp án 4']
    }));
  }

  selectAnswer(questionIndex: number, answerIndex: number) {
    if (this.selectedAnswers[questionIndex] === answerIndex) {
      this.selectedAnswers[questionIndex] = null;
    } else {
      this.selectedAnswers[questionIndex] = answerIndex;
    }
  }

  scrollToQuestion(index: number) {
    const elements = document.querySelectorAll('.question-block');
    const target = elements[index] as HTMLElement;
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }

  toggleFlag(index: number) {
    this.flaggedQuestions[index] = !this.flaggedQuestions[index];
  }

  startTimer() {
    this.timeLeft = this.exam.duration * 60;
    this.updateDisplayTime();
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateDisplayTime();
      } else {
        clearInterval(this.timerInterval);
        alert('⏰ Hết giờ làm bài!');
      }
    }, 1000);
  }

  updateDisplayTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.displayTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  onSubmit() {
  const confirmSubmit = confirm("Bạn có chắc chắn muốn nộp bài không?");
  if (confirmSubmit) {
    // TODO: xử lý nộp bài sau
    console.log("Nộp bài!");
  }
}

}

