import { Component, OnInit, Input } from '@angular/core';
import { Expense } from '../expense';
import { CATEGORIES } from '../globals';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ExpenseService }  from '../expense.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {
  
  @Input() expense: Expense;
  categories = CATEGORIES;
  myDate: any;

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getExpense();
  }
  
  getExpense(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.expenseService.getExpense(id)
    .subscribe(expense => {
      this.expense = expense; 
      this.breakDate(this.expense.date);
    });
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(expenseForm:any): void {
    //make sure that inputs are valid
    if (expenseForm.invalid) { 
      Object.keys( expenseForm.controls).forEach(key => {
       expenseForm.controls[key].markAsDirty();
      });
      return;
    }
    
    //if all is well, call the service
    this.expense.date = this.fixDate(this.myDate);
   this.expenseService.updateExpense(this.expense)
   .subscribe(() => this.goBack());
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
  
  //method to read the date in datepicker DOM element
  breakDate(date:any): any{
    let d = new Date(date);
      let o = {date:
        {
        year: d.getFullYear(),
        month: d.getUTCMonth(),
        day: d.getDate()
        }
      };
      this.myDate = o;
  }
  
  delete(id:string): void {
   this.expenseService.deleteExpense(id)
   .subscribe(() => this.goBack());
  }
}
