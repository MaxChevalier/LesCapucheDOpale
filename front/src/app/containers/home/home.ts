import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {

  userName: string = '';
  isLoading: boolean = true;
  isLoggedIn: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.isLoggedIn = this.accountService.isLogin();

    if (this.isLoggedIn) {
      this.accountService.getUserProfile().subscribe({
        next: (user) => {
          this.userName = user.name;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Une erreur est survenue lors de l\'affichage du profil.', err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }
}
