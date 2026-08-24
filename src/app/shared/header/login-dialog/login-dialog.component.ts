import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login-dialog',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
})
export class LoginDialogComponent {
  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialogRef<LoginDialogComponent>);

  formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private authService: AuthenticationService) {}

  async logar() {
    const { email, password } = this.formLogin.value;

    if (this.formLogin.valid) {
      if (email && password) {
        await this.authService.login({ email, password });

        if (this.authService.isAuthenticated()) {
          this.dialog.close(true);
          this.formLogin.reset();
        }
      }
    }
  }
}
