import { Component, OnInit } from '@angular/core';
import { Expense } from '../expense';
import { Location } from '@angular/common';
import { CATEGORIES } from '../globals';
import { DatePipe } from '@angular/common';
import { ExpenseService }  from '../expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  expense = new Expense();
  categories = CATEGORIES;
  myDate:any;

  constructor(private expenseService: ExpenseService, private location: Location) { }

  ngOnInit() {
  }
  
  goBack(): void {
    this.location.back();
  }
  
  add(expenseForm:any): void {
    //make sure that inputs are valid
    if (expenseForm.invalid) { 
      Object.keys( expenseForm.controls).forEach(key => {
       expenseForm.controls[key].markAsDirty();
      });
      return;
    }
    
   //if all is well, call the service function
   this.expense.date = this.fixDate(this.myDate);
   this.expenseService.addExpense(this.expense)
   .subscribe(() => this.goBack(), (err)=>console.log("oops, something went wrong"));
  }
  
  //method to save the date in the proper format for the expense model
  fixDate(date:any): Date{
    let d = new Date();
    //set month
    d.setUTCMonth(date.date.month - 1);
    //set year
    d.setFullYear(date.date.year);
    //set day
    d.setDate(date.date.day);
    return d;
  }
}
