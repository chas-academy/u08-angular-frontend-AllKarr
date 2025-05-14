import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './services/auth.service'; // Ensure AuthService is imported

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'transactions',
    canActivate: [AuthGuard], // Protected route
    loadComponent: () =>
      import('./pages/transactions/transactions.component').then(
        (m) => m.TransactionsComponent
      ),
  },
  {
    path: 'budgets',
    canActivate: [AuthGuard], // Protected route
    loadComponent: () =>
      import('./pages/budgets/budgets.component').then((m) => m.BudgetsComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
    canActivate: [AuthGuard], // Prevent authenticated users from accessing the login page
    data: { redirectTo: '/transactions' }, // Redirect authenticated users to transactions page
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then((m) => m.RegisterComponent),
    canActivate: [AuthGuard], // Prevent authenticated users from accessing the register page
    data: { redirectTo: '/transactions' }, // Redirect authenticated users to transactions page
  },
];
