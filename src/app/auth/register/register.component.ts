// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

const API_BASE = 'https://finance-api-1.onrender.com/api/v1';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(public router: Router) {}

  async register() {
    if (!this.username || !this.email || !this.password) {
      alert('Please enter username, email, and password.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Registration successful! You can now log in.');
        this.router.navigate(['/']);
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch {
      alert('Registration error.');
    }
  }
}

