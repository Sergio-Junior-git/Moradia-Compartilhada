import { Injectable, Inject, PLATFORM_ID  } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'moradia_token';
const USER_KEY = 'moradia_user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLogged$ = this.loggedIn.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.loggedIn.next(this.hasToken());
    }
   }

  saveToken(token: string) {
    if (!this.isBrowser) return;
    localStorage.setItem(TOKEN_KEY, token);
    this.loggedIn.next(true);
  }
  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(TOKEN_KEY);
  }
  saveUser(user: any) {
    if (!this.isBrowser) return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  getUser(): any {
    if (!this.isBrowser) return null;
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
  }
  clear() {
    if (!this.isBrowser) return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.loggedIn.next(false);
  }
  isLogged(): boolean {
    if (!this.isBrowser) return false;
    return !!this.getToken();
  }

  private hasToken(): boolean {
    if (!this.isBrowser) return false;
    return !!localStorage.getItem('token');
  }
  
}
