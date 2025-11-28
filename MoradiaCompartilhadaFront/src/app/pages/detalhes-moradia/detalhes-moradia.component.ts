import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoradiaService } from '../../services/moradia.service';

@Component({
  selector: 'app-detalhes-moradia',
  standalone: false,
  templateUrl: './detalhes-moradia.component.html',
  styleUrl: './detalhes-moradia.component.css'
})
export class DetalhesMoradiaComponent implements OnInit {
  
  moradia: any = null;
  moradiaId!: number;

  constructor(
    private route: ActivatedRoute,
    private moradiaService: MoradiaService
  ) {}

  ngOnInit() {
    this.moradiaId = Number(this.route.snapshot.paramMap.get('id'));

    this.moradiaService.getById(this.moradiaId)
      .subscribe(data => {
        this.moradia = data;

        // Se fotos vierem como objetos Foto → converter
        if (this.moradia.fotos && this.moradia.fotos.length) {
          this.moradia.fotos = this.moradia.fotos.map((f: any) =>
            `/uploads/${f.fileName ?? f}`
          );
        }
      });
  }

  
}
