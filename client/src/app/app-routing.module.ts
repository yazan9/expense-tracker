import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard', component: ExpensesComponent },
  { path: 'detail/:id', component: ExpenseDetailComponent },
  { path: 'new', component: AddExpenseComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
