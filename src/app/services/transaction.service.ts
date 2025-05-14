import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://finance-api-1.onrender.com/api/v1/transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL);
  }

  addTransaction(data: any): Observable<any> {
    return this.http.post(BASE_URL, data);
  }

  updateTransaction(id: string, data: any): Observable<any> {
    return this.http.put(`${BASE_URL}/${id}`, data);
  }

  deleteTransaction(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}
