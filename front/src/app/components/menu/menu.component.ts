import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../services/account/account.service'
@Component({
  selector: 'app-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  open = false;
  constructor(protected accountService: AccountService) {
  
    }
}