import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  readonly authService = inject(AuthenticationService);

  readonly currentUser = this.authService.UserAuthenticated;

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  openLogoutDialog() {
    this.dialog.open(LogoutDialogComponent);
  }

  logout() {
    this.authService.logout();
  }
}
