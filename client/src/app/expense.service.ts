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
  
  private expensesUrl = 'https://track-my-expenses-chilivote.c9users.io:8081/api/expenses';  //to be changed to a global variable
  private expenseUrl = 'https://track-my-expenses-chilivote.c9users.io:8081/api/expense';  //to be changed to a global variable

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
    // A client-side or network error occurred. Handle it accordingly.
    //console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    //console.error(
    //  `Backend returned code ${error.status}, ` +
    //  `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  
  //console.log("I am being handled");
  return throwError(
    'Something bad happened; please try again later.');
  };
}