import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoradiaService } from '../../services/moradia.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-anunciar',
  standalone: false,
  templateUrl: './anunciar.component.html',
  styleUrl: './anunciar.component.css'
})
export class AnunciarComponent {
  usuarioLogado: any = null;
  form!: FormGroup;

  tiposMoradia = [
    { value: 'CASA', label: 'Casa' },
    { value: 'APARTAMENTO', label: 'Apartamento' },
    { value: 'KITNET', label: 'Kitnet' },
    { value: 'QUARTO', label: 'Quarto' }
  ];

  constructor(
    private fb: FormBuilder,
    private moradiaService: MoradiaService,
    private authService: AuthService,
    private router: Router
  ) {
    console.log('AuthService no constructor:', this.authService);
  }

  ngOnInit() {
    this.usuarioLogado = this.authService.getUsuario();

    if (!this.usuarioLogado) {
      alert('Faça login para criar um anúncio.');
      this.router.navigate(['/login']);
      return;
    }

    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      endereco: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(1)]],
      quartos: [1, [Validators.required, Validators.min(1)]],
      tipo: ['', Validators.required],
      disponivelImediatamente: [false],
      contasInclusas: [false],
    });
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dados = {
      ...this.form.value,
      owner: { id: this.usuarioLogado.id }
    };

    this.moradiaService.criarMoradia(dados).subscribe({
      next: () => {
        alert('Anúncio criado com sucesso!');
        this.router.navigate(['/perfil/meus-anuncios']);
      },
      error: err => {
        console.error(err);
        alert('Erro ao criar anúncio.');
      }
    });
    this.router.navigate(['/anuncios']);
  }
}
