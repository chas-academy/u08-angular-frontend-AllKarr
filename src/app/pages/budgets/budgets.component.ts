import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent {
  category = '';
  limit: number | null = null;
  searchTerm = '';
  budgets: any[] = [];

  constructor(private budgetService: BudgetService) {
    this.fetchBudgets();
  }

  fetchBudgets() {
    this.budgetService.getBudgets().subscribe({
      next: (data) => this.budgets = data,
      error: () => alert('Failed to load budgets')
    });
  }

  addBudget() {
    if (!this.category || this.limit === null || isNaN(this.limit)) {
      return alert('Please enter valid inputs.');
    }

    const payload = { category: this.category, limit: this.limit };

    this.budgetService.addBudget(payload).subscribe({
      next: () => {
        this.category = '';
        this.limit = null;
        this.fetchBudgets();
      },
      error: () => alert('Failed to add budget')
    });
  }

  deleteBudget(id: string) {
    if (!confirm('Delete this budget?')) return;

    this.budgetService.deleteBudget(id).subscribe({
      next: () => this.fetchBudgets(),
      error: () => alert('Failed to delete budget')
    });
  }

  editBudget(b: any) {
    const newCategory = prompt('New category:', b.category);
    const newLimitStr = prompt('New limit:', b.limit);

    if (!newCategory || newLimitStr === null || isNaN(parseFloat(newLimitStr))) {
      return alert('Invalid input.');
    }

    const updated = {
      category: newCategory,
      limit: parseFloat(newLimitStr)
    };

    this.budgetService.updateBudget(b._id, updated).subscribe({
      next: () => this.fetchBudgets(),
      error: () => alert('Failed to update budget')
    });
  }

  filterBudgets() {
    if (!this.searchTerm.trim()) return this.budgets;

    return this.budgets.filter((b) =>
      b.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
