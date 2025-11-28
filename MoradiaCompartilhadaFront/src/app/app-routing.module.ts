import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AnunciarComponent } from './pages/anunciar/anunciar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DetalhesMoradiaComponent } from './pages/detalhes-moradia/detalhes-moradia.component';
import { PerfilComponent } from './pages/conta/perfil/perfil.component';
import { MeusAnunciosComponent } from './pages/conta/meus-anuncios/meus-anuncios.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'sobre', component: SobreComponent},
  {path: 'contato', component: ContatoComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'anuncios/criar', component: AnunciarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'moradia/:id', component: DetalhesMoradiaComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'anuncios', component: MeusAnunciosComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
