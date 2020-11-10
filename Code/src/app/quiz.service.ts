import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Question} from './model/Question'

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpClient:HttpClient) { }

  loadProductDetails():Observable<Question[]>{
    return this.httpClient.get<Question[]>("http://localhost:3000/questions");        
    }
}
