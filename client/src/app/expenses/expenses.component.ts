import { Component, OnInit } from '@angular/core';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import {CATEGORIES} from '../globals';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  
  expenses : Expense[];
  selectedExpense: Expense;
  total = 0;
  totalThisMonth = 0;
  grouped :any;

  public pieChartLabels:string[] = [];
  public pieChartData2:number[] = [];
  public pieChartType:string = 'pie';
  public pieCaption:string;
  
  dataLoaded: Promise<boolean>;

  onSelect(expense: Expense): void {
    this.selectedExpense = expense;
  }

  constructor(private expenseService: ExpenseService) { }
  
  getExpenses(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses , (err) => console.log("not authorized 001");
      this.countAll();
      this.countAllThisMonth();
      this.grouped = this.setGroups();
      this.calculateExpensesByCategory(this.grouped);
    });
  }

  ngOnInit() {
    this.getExpenses();
  }
  
  countAll() {
    this.expenses.map(ex => this.total += ex["amount"]);
  }
  
  countAllThisMonth(){
    let today = new Date();
    let month = today.getUTCMonth();
    this.expenses.filter(ex => new Date(ex.date).getUTCMonth() === month).map(ex => this.totalThisMonth+= ex.amount);
  }
  
  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
  }
  
  setGroups(){
    return this.groupBy(this.expenses, expense => expense.category);
  }
  
  calculateExpensesByCategory(grouped: any){
    CATEGORIES.forEach(category => {
      
      let group = grouped.get(category);
      if(group != null){
        let total:number = 0, i = 0;
        let length = group.length;

        group.forEach(expense => {
          //if at the the end
          if(i === length-1){
            total += expense.amount;
            this.pieChartLabels.push(category);
            this.pieChartData2.push(total);
            total = 0;
            i=0;
          }
          else{
            total += expense.amount;
            i++;
          }
        });//end inner for each
      }//end if
    });//end outer loop
    
    if(this.pieChartLabels.length === 0){
      this.pieCaption = "When you start adding your expenses your chart will look like this:";
      this.pieChartLabels = ["Rent", "Grocery", "Fuel"];
      this.pieChartData2 = [2000, 700, 250];
    }
    this.dataLoaded = Promise.resolve(true);
  }
}