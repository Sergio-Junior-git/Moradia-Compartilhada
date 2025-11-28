import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
    

  ) {
    this.form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    telefone: ['']
  });
  }

  loading = false;
  errorMessage = '';



  registrar() {
    if (this.form.invalid) {
      this.errorMessage = 'Preencha todos os campos corretamente!';
      return;
    }

    this.loading = true;

    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: err => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'Erro ao registrar';
      }
    });
  }

}
