import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  let service: BudgetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import HttpClientTestingModule
      providers: [BudgetService]  // Make sure BudgetService is provided
    });
    service = TestBed.inject(BudgetService);
    httpMock = TestBed.inject(HttpTestingController);  // Inject HttpTestingController
  });

  afterEach(() => {
    httpMock.verify();  // Verify no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch budgets from the API', () => {
    const mockBudgets = [
      { id: '1', name: 'Budget 1', amount: 500 },
      { id: '2', name: 'Budget 2', amount: 1000 }
    ];

    service.getBudgets().subscribe((budgets) => {
      expect(budgets.length).toBe(2);
      expect(budgets).toEqual(mockBudgets);
    });

    const req = httpMock.expectOne('https://finance-api-1.onrender.com/api/v1/budgets');
    expect(req.request.method).toBe('GET');
    req.flush(mockBudgets);  // Simulate a successful response
  });

  it('should add a new budget', () => {
    const newBudget = { id: '3', name: 'Budget 3', amount: 1500 };

    service.addBudget(newBudget).subscribe((budget) => {
      expect(budget).toEqual(newBudget);
    });

    const req = httpMock.expectOne('https://finance-api-1.onrender.com/api/v1/budgets');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newBudget);
    req.flush(newBudget);  // Simulate a successful response
  });

  it('should update a budget', () => {
    const updatedBudget = { id: '1', name: 'Updated Budget 1', amount: 600 };

    service.updateBudget('1', updatedBudget).subscribe((budget) => {
      expect(budget).toEqual(updatedBudget);
    });

    const req = httpMock.expectOne('https://finance-api-1.onrender.com/api/v1/budgets/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedBudget);
    req.flush(updatedBudget);  // Simulate a successful response
  });

  it('should delete a budget', () => {
    service.deleteBudget('1').subscribe((response) => {
      expect(response).toEqual({});  // Expecting an empty object for delete response
    });

    const req = httpMock.expectOne('https://finance-api-1.onrender.com/api/v1/budgets/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});  // Simulate a successful response (empty object for delete)
  });
});
