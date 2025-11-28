import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogged = false;
  foto: string = "assets/default-user.png";

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit() {
    this.tokenService.isLogged$.subscribe(isLogged => {
    this.isLogged = isLogged;

    if (isLogged) {
      const user = this.tokenService.getUser();
      this.foto = user?.foto || "assets/default-user.png";
    } else {
      this.foto = "assets/default-user.png";
    }
  });
  }

  logout() {
    this.tokenService.clear();
    this.isLogged = false;
    this.router.navigate(['/home']);
  }
}
