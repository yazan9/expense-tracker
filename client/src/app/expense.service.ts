import { Injectable } from '@angular/core';
import { Expense } from './expense';
//import { EXPENSES } from './mock-expenses';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService, UserDetails } from './authentication.service';
import { catchError} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  
  private expensesUrl = 'https://glacial-sea-72131.herokuapp.com/api/expenses';  //to be changed to a global variable
  private expenseUrl = 'https://glacial-sea-72131.herokuapp.com/api/expense';  //to be changed to a global variable

  constructor(private http: HttpClient, private authService : AuthenticationService, private router: Router) { }
  
  //get ALL
  getExpenses(): Observable<Expense[]> {
    //return of(EXPENSES); //rxjs
    return this.http.get<Expense[]>(this.expensesUrl, { headers: { Authorization: `Bearer ${this.authService.getToken()}` }}).pipe(
      catchError(this.handleError)
    );
  }
  
  //get SPECIFIC
  getExpense(id: string): Observable<Expense> {
    //return of(EXPENSES.find(expense => expense.id === id)); //rxjs
    return this.http.get<Expense>(`${this.expenseUrl}/${id}`, { headers: { Authorization: `Bearer ${this.authService.getToken()}` }});
  }
  
  updateExpense (expense: Expense): Observable<any> {
    return this.http.put(this.expenseUrl, expense, { headers: { Authorization: `Bearer ${this.authService.getToken()}` }});
  }
  
  addExpense (expense: Expense): Observable<any> {
    return this.http.post(this.expenseUrl, expense, { headers: { Authorization: `Bearer ${this.authService.getToken()}` }});
  }
  
  deleteExpense (id: String): Observable<any> {
    return this.http.delete(`${this.expenseUrl}/${id}`, { headers: { Authorization: `Bearer ${this.authService.getToken()}` }});
  }
  
  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    
  } else {
    
  }
  // return an observable with a user-facing error message
  
  return throwError(
    'Something bad happened; please try again later.');
  };
}