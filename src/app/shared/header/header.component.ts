import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AuthenticationService } from '../../services/authentication.service';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatDialogModule, MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  readonly authService = inject(AuthenticationService);

  private router = inject(Router);

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

  toHome() {
    this.router.navigate(['/']);
  }
}
