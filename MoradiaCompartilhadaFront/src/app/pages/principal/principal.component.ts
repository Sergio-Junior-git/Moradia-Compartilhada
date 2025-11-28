import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoradiaService } from '../../services/moradia.service';

@Component({
  selector: 'app-principal',
  standalone: false,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {

  moradias: any[] = [];

  filtros = {
    texto: null as string | null,
    minPreco: null as number | null,
    maxPreco: null as number | null,
    quartos: null as number | null,
    tipo: null as string | null
  };

  quartosOptions = [1, 2, 3, 4, 5];
  tipos = ['CASA', 'APARTAMENTO', 'KITNET', 'OUTRO'];

  constructor(private service: MoradiaService, private router: Router) {}

  ngOnInit(): void {
    this.buscar(); // carrega tudo ao iniciar
  }

  buscar() {
    this.service.filtrar(this.filtros).subscribe({
      next: (res) => (this.moradias = res)
    });
  }

  openDetails(id: number) {
    this.router.navigate(['/moradia', id]);
  }

}
