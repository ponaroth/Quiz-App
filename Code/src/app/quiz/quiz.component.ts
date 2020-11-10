import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question } from '../model/Question';
import { QuizService } from '../Quiz.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  header: string = "Quiz App";
  questionList: Question[];
  qCount = 0;
  currentQuestion: string = "Click next to start the quiz";
  choiceText1: string;
  choiceText2: string;
  choiceText3: string;
  choiceText4: string;
  currentChoice: string;
  button1: string = "Next";
  quizOver: boolean = false;
  score: number = 0;
  totalScore: number = 0;

  form1 = new FormGroup({
    choice: new FormControl(),
  })

  constructor(private titleService: Title, private quizService: QuizService) {
    this.titleService.setTitle("Quiz App");
  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.quizService.loadProductDetails().subscribe(data => this.questionList = data);
  }

  updateQuestion() {
    let count = this.qCount;
    this.totalScore = this.questionList.length;

    if (count >= 1) {
      // update selected property and remove default from choice
      this.questionList[count-1].selected = this.form1.value.choice;
    }
    
    this.form1.reset({choice: null});
   

    if (count == this.questionList.length - 1) {
      this.button1 = "Submit";
    }

    if (count < this.questionList.length) {
      
      this.currentQuestion = this.questionList[count].question;
      this.choiceText1 = this.questionList[count].choices[0];
      this.choiceText2 = this.questionList[count].choices[1];
      this.choiceText3 = this.questionList[count].choices[2];
      this.choiceText4 = this.questionList[count].choices[3];
      this.qCount++;

    } else {
      this.header = "Quiz Score: "
      this.qCount = 0;
      this.quizOver = true;
      this.updateScore();
    }
  }

  // return total score
  updateScore() {
    this.questionList.forEach(q => {
      if (q.selected == q.correct) {
        this.score++;
      }
    });
  }

  startOver() {
    this.quizOver = false;
    this.qCount = 1;
    this.header = "Quiz App";
  }


}


