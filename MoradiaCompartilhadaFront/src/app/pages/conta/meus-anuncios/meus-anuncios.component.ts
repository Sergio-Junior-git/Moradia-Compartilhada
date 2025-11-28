import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoradiaService } from '../../../services/moradia.service';
import { AuthService } from '../../../services/auth.service';
import { Moradia } from '../../../models/moradia/moradia';


@Component({
  selector: 'app-meus-anuncios',
  standalone: false,
  templateUrl: './meus-anuncios.component.html',
  styleUrl: './meus-anuncios.component.css'
})
export class MeusAnunciosComponent implements OnInit {
  anuncios: Moradia[] = [];
  usuario: any;

  constructor(
    private moradiaService: MoradiaService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario = this.auth.getUsuario();

    if (!this.usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.carregarAnuncios();
  }

  carregarAnuncios() {
    this.moradiaService.getByOwner(this.usuario.id).subscribe({
      next: (data) => this.anuncios = data,
      error: () => this.anuncios = []
    });
  }

  criarNovo() {
    this.router.navigate(['/anuncios/criar']);
  }
}
