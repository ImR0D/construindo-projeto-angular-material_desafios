export function toBase64<T>(obj: T): string {
  const strfyObj = JSON.stringify(obj);
  const encode = new TextEncoder().encode(strfyObj);
  const strBytes = Array.from(encode, (byte) => String.fromCharCode(byte)).join(
    '',
  );
  return btoa(strBytes);
}

export function toRegular<T>(base64: string): T | null {
  try {
    const strBytes = atob(base64);
    const bytes = Uint8Array.from(strBytes, (m) => m.charCodeAt(0));
    const decode = new TextDecoder().decode(bytes);
    return JSON.parse(decode) as T;
  } catch (error) {
    return null;
  }
}
