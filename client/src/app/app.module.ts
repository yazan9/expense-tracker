import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { HomeComponent } from './home/home.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ExpensesComponent,
    ExpenseDetailComponent,
    AddExpenseComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MyDatePickerModule,
    ChartsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
