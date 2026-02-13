const authKey = "atk";
const userNameKey = "usn";

export class AuthService {
  private static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private static getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  private static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static setAuth(username: string) {
    this.setItem(userNameKey, username);
    this.setItem(authKey, "true");
  }

  static clearAuth() {
    this.removeItem(userNameKey);
    this.removeItem(authKey);
  }

  static isLoggedIn(): boolean {
    return this.getItem(authKey) === "true";
  }

  static getUsername(): string | null {
    return this.getItem(userNameKey);
  }
}
