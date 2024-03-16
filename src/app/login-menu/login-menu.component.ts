import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-menu',
  standalone: true,
  imports: [],
  templateUrl: './login-menu.component.html',
  styleUrl: './login-menu.component.css'
})
export class LoginMenuComponent {
  constructor(private router: Router) { }

  registerClick() {
    this.router.navigate(['/register']);
  }
  loginClick() {
    this.router.navigate(['/login']);
  }
}
