import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { AuthenticationService } from '../../../services/authentication.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout-dialog',
  imports: [MatButtonModule, MatDialogContent, MatDialogActions],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss',
})
export class LogoutDialogComponent {
  private dialog = inject(MatDialogRef<LogoutDialogComponent>);

  constructor(private authService: AuthenticationService) {}

  cancel() {
    this.dialog.close();
  }

  confirm() {
    this.authService.logout();
    this.dialog.close();
  }
}
