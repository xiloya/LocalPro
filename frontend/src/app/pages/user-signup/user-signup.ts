import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-signup.html',
  styleUrls: ['./user-signup.css'],
})
export class UserSignup {
  firstName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  role: string = 'client';
  bio: string = '';
  competences: string = '';
  disponibilite: boolean = true;
  termsAccepted: boolean = false;
  signupButtonText: string = 'Sign Up';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }
    this.signupButtonText = 'Signing Up...';

    const userData: any = {
      username: this.firstName,
      email: this.email,
      phone: this.phone,
      password: this.password,
      role: this.role,
    };

    if (this.role === 'prestataire') {
      userData.bio = this.bio;
      userData.competences = this.competences;
      userData.disponibilite = this.disponibilite;
    }

    this.authService.register(userData).subscribe({
      next: (res) => {
        alert('Account created successfully!');
        this.signupButtonText = 'Sign Up';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error.msg || 'Signup failed');
        this.signupButtonText = 'Sign Up';
      },
    });
  }

  socialLogin(provider: string) {
    alert(`Redirecting to ${provider} login...`);
  }
}
