import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { AnunciarComponent } from './pages/anunciar/anunciar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './pages/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import {MatMenuModule} from '@angular/material/menu';
import { NavbarComponent } from './pages/navbar/navbar.component';
import {MatSelectModule} from '@angular/material/select';
import { DetalhesMoradiaComponent } from './pages/detalhes-moradia/detalhes-moradia.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { PerfilComponent } from './pages/conta/perfil/perfil.component';
import { MeusAnunciosComponent } from './pages/conta/meus-anuncios/meus-anuncios.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrincipalComponent,
    SobreComponent,
    ContatoComponent,
    AnunciarComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    NavbarComponent,
    DetalhesMoradiaComponent,
    PerfilComponent,
    MeusAnunciosComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
    
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
