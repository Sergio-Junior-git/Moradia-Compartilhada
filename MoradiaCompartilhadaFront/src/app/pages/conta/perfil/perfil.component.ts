import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  form!: FormGroup;
  formSenha!: FormGroup;
  usuario: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
        ]
      ],
      genero: [''],
      dataNascimento: [''],
      telefone: ['', Validators.required]
    });

    this.formSenha = this.fb.group({
      senhaAtual: ['', Validators.required],
      novaSenha: ['', Validators.required]
    });

    // Carregar dados do usuário logado
    this.usuario = this.authService.getUsuario();

    if (this.usuario) {
      this.form.patchValue({
        nome: this.usuario.nome,
        sobrenome: this.usuario.sobrenome,
        email: this.usuario.email,
        genero: this.usuario.genero,
        dataNascimento: this.usuario.dataNascimento,
        telefone: this.usuario.telefone
      });
    }
  }

  salvar() {
    if (this.form.invalid) return;
    const payload = { ...this.form.value};
    console.log("Payload enviado:", payload);
    this.authService.updateProfile(payload).subscribe({
      next: () => alert('Perfil atualizado com sucesso!'),
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar o perfil');
      }
    });
  }

  alterarSenha() {
    if (this.formSenha.invalid) return;

    this.authService.changePassword(this.formSenha.value).subscribe({
      next: () => alert('Senha alterada com sucesso!'),
      error: () => alert('Erro ao alterar senha')
    });
  }
}
