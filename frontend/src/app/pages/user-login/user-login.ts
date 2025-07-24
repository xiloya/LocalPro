import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css'],
})
export class UserLogin {
  email: string = '';
  password: string = '';
  loginButtonText: string = 'Login';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loginButtonText = 'Logging in...';
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          this.loginButtonText = 'Login';
          this.authService.currentUser$.subscribe((user) => {
            if (user) {
              if (user.role === 'client') {
                this.router.navigate(['/reservations-client']);
              } else if (user.role === 'prestataire') {
                this.router.navigate(['/reservations-prestataire']);
              } else {
                this.router.navigate(['/marketplace-homepage']);
              }
            }
          });
        },
        error: (err) => {
          alert(err.error.msg || 'Login failed');
          this.loginButtonText = 'Login';
        },
      });
  }
}
