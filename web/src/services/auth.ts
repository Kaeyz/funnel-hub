const adminAuthKey = "atk";
const adminNameKey = "usn";

const userAuthKey = "utk";
const userNameKey = "usn";

type UserType = "admin" | "user";

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

  private static getNameKey(type: UserType) {
    return type === "admin" ? adminNameKey : userNameKey;
  }

  private static getAuthKey(type: UserType) {
    return type === "admin" ? adminAuthKey : userAuthKey;
  }

  static setAuth(username: string, type: UserType) {
    const authKey = this.getAuthKey(type);
    const nameKey = this.getNameKey(type);
    this.setItem(nameKey, username);
    this.setItem(authKey, "true");
  }

  static clearAuth(type: UserType) {
    const authKey = this.getAuthKey(type);
    const nameKey = this.getNameKey(type);
    this.removeItem(nameKey);
    this.removeItem(authKey);
  }

  static isLoggedIn(type: UserType): boolean {
    const authKey = this.getAuthKey(type);
    return this.getItem(authKey) === "true";
  }

  static getUsername(type: UserType): string | null {
    const nameKey = this.getNameKey(type);
    return this.getItem(nameKey);
  }
}
