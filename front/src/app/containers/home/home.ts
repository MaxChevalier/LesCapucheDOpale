import { Component } from '@angular/core';
import { AccountService } from '../../services/account/account.service'
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
 constructor(protected accountService: AccountService) {
  
    }
}
