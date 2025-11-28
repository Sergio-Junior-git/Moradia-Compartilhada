import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogged = false;
  userFoto = 'assets/img/profile.png'; // foto padrão

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const foto = localStorage.getItem('userFoto');

    this.isLogged = !!token;

    if (foto) this.userFoto = foto;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
