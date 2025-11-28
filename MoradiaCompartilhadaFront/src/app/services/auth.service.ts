import { Injectable, PLATFORM_ID, Inject  } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, tap, BehaviorSubject  } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

interface LoginPayload { email: string; senha: string; }
interface LoginResponse { token: string; usuario: any; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080/api/usuarios';

  private usuarioLogadoSubject = new BehaviorSubject<any>(null);
  usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) { 
    this.loadUserInfo();
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/login`, payload).pipe(
      tap(res => {
        if (res?.token) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('usuario', JSON.stringify(res.usuario));
          }
        }
      })
    );
  }

 isLogged(): boolean {
  if (isPlatformBrowser(this.platformId)) {
    return !!localStorage.getItem('token');
  }
  return false;
}

updateProfile(data: any): Observable<any> {
  const token = isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.put(`${this.api}/update-profile`, data, { headers }).pipe(
    tap((user: any) => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('usuario', JSON.stringify(user));
      }
      this.usuarioLogadoSubject.next(user);
    })
  );
  }

  changePassword(data: { senhaAtual: string; novaSenha: string }): Observable<any> {
    const token = isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.put(`${this.api}/change-password`, data, { headers });
  }

  loadUserInfo() {
  if (!isPlatformBrowser(this.platformId)) return;

  const user = localStorage.getItem('usuario');
  if (user) {
    this.usuarioLogadoSubject.next(JSON.parse(user));
  }
}

  logout() {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
  this.usuarioLogadoSubject.next(null);
}

  getUsuario() {
    return this.usuarioLogadoSubject.value;
  }

 register(data: any) {
  return this.http.post(this.api + '/register', {
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    telefone: data.telefone
  });
}


  
}
