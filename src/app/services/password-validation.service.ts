import { Injectable } from '@angular/core';
import { PasswordHashResult } from '../models/password-hash-result';

@Injectable({
  providedIn: 'root',
})
export class PasswordValidationService {
  private readonly ITERATIONS = 100000;
  private readonly KEY_LENGTH = 256; // bits (32 bytes)
  private readonly HASH_ALGORITHM = 'SHA-256';
  private readonly SALT_BYTE_LENGTH = 16; // 128 bits

  async hashPassword(
    plainText: string,
    saltHex?: string,
  ): Promise<PasswordHashResult> {
    // Gerar ou utilizar o Salt existente
    const saltBytes = saltHex ? this.hexToBytes(saltHex) : this.generateSalt();
    const currentSaltHex = saltHex || this.bytesToHex(saltBytes);

    // Converter o plaintext em um buffer de bytes
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(plainText);

    // Importar o plaintext como chave base para o PBKDF2
    const baseKey = await crypto.subtle.importKey(
      'raw',
      passwordBytes,
      { name: 'PBKDF2' },
      false,
      ['deriveBits'],
    );

    // Derivar os bits com PBKDF2 + HMAC-SHA256
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: saltBytes as unknown as ArrayBuffer,
        iterations: this.ITERATIONS,
        hash: this.HASH_ALGORITHM,
      },
      baseKey,
      this.KEY_LENGTH,
    );

    // Converter a chave derivada direto para Hexadecimal
    const hashHex = this.bytesToHex(new Uint8Array(derivedBits));

    return {
      hash: hashHex,
      salt: currentSaltHex,
      algorithm: `PBKDF2-HMAC-${this.HASH_ALGORITHM}`,
      iterations: this.ITERATIONS,
    };
  }

  async validatePassword(
    plainText: string,
    expectedHash: string,
    salt: string,
  ): Promise<boolean> {
    try {
      if (!plainText || !expectedHash || !salt) {
        return false;
      }
      const result = await this.hashPassword(plainText, salt);
      return result.hash.toLowerCase() === expectedHash.toLowerCase();
    } catch (error) {
      return false;
    }
  }

  private generateSalt(): Uint8Array {
    const saltBytes = new Uint8Array(this.SALT_BYTE_LENGTH);
    crypto.getRandomValues(saltBytes);
    return saltBytes;
  }

  private hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return bytes;
  }

  private bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
