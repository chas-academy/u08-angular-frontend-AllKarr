import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private API_URL = 'https://finance-api-1.onrender.com/api/v1/budgets';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: {
        'x-api-key': localStorage.getItem('apiKey') || '',
        'Content-Type': 'application/json'
      }
    };
  }

  getBudgets(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL, this.getHeaders());
  }

  addBudget(budget: any): Observable<any> {
    return this.http.post(this.API_URL, budget, this.getHeaders());
  }

  deleteBudget(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, this.getHeaders());
  }

  updateBudget(id: string, updated: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, updated, this.getHeaders());
  }
}
