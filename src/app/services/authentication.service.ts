import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { Login } from '../models/login';
import { PasswordValidationService } from './password-validation.service';
import { UserAuthenticateService } from './user-authenticate.service';
import { firstValueFrom } from 'rxjs';
import { toBase64, toRegular } from '../helpers/base64.convertions';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private lsName: string = 'u-auth';

  private user = signal<User | null>(this.loadUserFromLocalStorage());
  readonly UserAuthenticated = this.user.asReadonly();

  private isUserAuthenticated = computed(() => this.user() != null);

  constructor(
    private pwdService: PasswordValidationService,
    private authService: UserAuthenticateService,
  ) {}

  async login(userLogin: Login): Promise<void> {
    const user = await firstValueFrom(
      this.authService.getUserByEmail(userLogin.email),
    );

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const passwordValid = await this.pwdService.validatePassword(
      userLogin.password,
      user.hash,
      user.salt,
    );

    if (passwordValid && user) {
      const convertedUser = toBase64(user);
      localStorage.setItem(this.lsName, convertedUser);
      this.user.set(user);
    }
  }

  logout(): void {
    this.user.set(null);
    localStorage.removeItem(this.lsName);
  }

  isAuthenticated(): boolean {
    return this.isUserAuthenticated();
  }

  private loadUserFromLocalStorage(): User | null {
    const storedUser = localStorage.getItem(this.lsName);
    if (!storedUser) return null;

    try {
      return toRegular<User>(storedUser) ?? null;
    } catch {
      localStorage.removeItem(this.lsName);
      return null;
    }
  }
}
