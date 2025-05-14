import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  // Toggle the 'open' class to control sidebar visibility
  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    
    sidebar?.classList.toggle('open'); // Toggle sidebar open/close
    hamburgerMenu?.classList.toggle('open'); // Toggle hamburger icon
  }
}
