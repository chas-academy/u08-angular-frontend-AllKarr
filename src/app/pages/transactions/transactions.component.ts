import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true, // ✅ Required in standalone setup
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  imports: [CommonModule, FormsModule] // ✅ Needed for ngIf, ngFor, ngModel
})
export class TransactionsComponent {
  description = '';
  amount: number | null = null;
  category = '';
  type = 'expense';
  searchTerm = '';
  transactions: any[] = [];

  constructor(private transactionService: TransactionService) {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (data) => this.transactions = data,
      error: () => alert('Failed to load transactions')
    });
  }

  addTransaction() {
    if (!this.description || this.amount === null || !this.category || !this.type) {
      return alert('Please fill in all fields');
    }

    const payload = {
      description: this.description,
      amount: this.amount,
      category: this.category,
      type: this.type,
    };

    this.transactionService.addTransaction(payload).subscribe({
      next: () => {
        this.description = '';
        this.amount = null;
        this.category = '';
        this.type = 'expense';
        this.fetchTransactions();
      },
      error: () => alert('Failed to add transaction'),
    });
  }

  editTransaction(t: any) {
    const newDescription = prompt('New description:', t.description);
    const newAmountStr = prompt('New amount:', t.amount);
    const newCategory = prompt('New category:', t.category);
    const newType = prompt('New type (income/expense):', t.type);

    if (
      newDescription === null ||
      newAmountStr === null ||
      newCategory === null ||
      newType === null
    ) {
      return;
    }

    const parsedAmount = parseFloat(newAmountStr);
    if (isNaN(parsedAmount)) {
      alert('Amount must be a number');
      return;
    }

    const updated = {
      description: newDescription,
      amount: parsedAmount,
      category: newCategory,
      type: newType,
    };

    this.transactionService.updateTransaction(t._id, updated).subscribe({
      next: () => this.fetchTransactions(),
      error: () => alert('Failed to update transaction'),
    });
  }

  deleteTransaction(id: string) {
    if (!confirm('Delete this transaction?')) return;

    this.transactionService.deleteTransaction(id).subscribe({
      next: () => this.fetchTransactions(),
      error: () => alert('Failed to delete transaction'),
    });
  }

  filterTransactions() {
    if (!this.searchTerm.trim()) return this.transactions;

    return this.transactions.filter((t) =>
      t.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
