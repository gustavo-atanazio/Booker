export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonStr = atob(base64);
    return JSON.parse(jsonStr) as JwtPayload;
  } catch {
    return null;
  }
}
