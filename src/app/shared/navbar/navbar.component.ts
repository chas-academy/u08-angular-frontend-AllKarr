import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

const API_BASE = 'https://finance-api-1.onrender.com/api/v1';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  welcomeMessage: string = '';

  ngOnInit(): void {
    const storedUser = localStorage.getItem('username');
    const storedApiKey = localStorage.getItem('apiKey');

    if (storedUser && storedApiKey) {
      this.isLoggedIn = true;
      this.welcomeMessage = `Welcome ${storedUser}!`;
    }

    window.addEventListener('storage', this.syncAcrossTabs.bind(this));
  }

  constructor(private router: Router) {}

async login() {
  if (!this.username || !this.password) {
    alert('Please enter username and password.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.username, password: this.password }),
    });

    const data = await res.json();
    if (res.ok && data.apiKey) {
      localStorage.setItem('apiKey', data.apiKey);
      localStorage.setItem('username', this.username);
      this.isLoggedIn = true;
      this.welcomeMessage = `Welcome ${this.username}!`;
      alert('Login successful!');
      this.router.navigate(['/transactions']); // 👈 Gå till transactions
    } else {
      alert(data.message || 'Login failed.');
    }
  } catch {
    alert('Login error.');
  }
}

  logout() {
    localStorage.removeItem('apiKey');
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.username = '';
    this.password = '';
    this.welcomeMessage = '';
    alert('Logged out!');
  }

  syncAcrossTabs(event: StorageEvent) {
    if (event.key === 'apiKey') {
      const apiKey = localStorage.getItem('apiKey');
      const username = localStorage.getItem('username');

      if (apiKey) {
        this.isLoggedIn = true;
        this.welcomeMessage = `Welcome ${username}!`;
      } else {
        this.isLoggedIn = false;
        this.welcomeMessage = '';
      }
    }
  }
}
