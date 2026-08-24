export interface PasswordHashResult {
  hash: string;
  salt: string;
  algorithm: string;
  iterations: number;
}
