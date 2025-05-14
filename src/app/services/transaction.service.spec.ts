import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import HttpClientTestingModule
      providers: [TransactionService]
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);  // Inject HttpTestingController
  });

  afterEach(() => {
    httpMock.verify();  // Verify no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch transactions from the API', () => {
    const mockTransactions = [
      { id: '1', name: 'Transaction 1', amount: 100 },
      { id: '2', name: 'Transaction 2', amount: 200 }
    ];

    service.getTransactions().subscribe((transactions) => {
      expect(transactions.length).toBe(2);
      expect(transactions).toEqual(mockTransactions);
    });

    const req = httpMock.expectOne('https://finance-api-1.onrender.com/api/v1/transactions');
    expect(req.request.method).toBe('GET');
    req.flush(mockTransactions);  // Simulate a successful response
  });

  it('should add a transaction', () => {
    const newTransaction = { id: '3', name: 'Transaction 3', amount: 300 };

    service.addTransaction(newTransaction).subscribe((transaction) => {
      expect(transaction).toEqual(newTransaction);
    });

    const req = httpMock.expectOne('https://finance-api-1.onrender.com/api/v1/transactions');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTransaction);
    req.flush(newTransaction);  // Simulate a successful response
  });

  it('should update a transaction', () => {
    const updatedTransaction = { id: '1', name: 'Updated Transaction 1', amount: 150 };

    service.updateTransaction('1', updatedTransaction).subscribe((transaction) => {
      expect(transaction).toEqual(updatedTransaction);
    });

    const req = httpMock.expectOne('https://finance-api-1.onrender.com/api/v1/transactions/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTransaction);
    req.flush(updatedTransaction);  // Simulate a successful response
  });

  it('should delete a transaction', () => {
    service.deleteTransaction('1').subscribe((response) => {
      expect(response).toEqual({});  // Expecting an empty object for delete response
    });

    const req = httpMock.expectOne('https://finance-api-1.onrender.com/api/v1/transactions/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});  // Simulate a successful response (empty object for delete)
  });
});
