import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Moradia Compartilhada';

  constructor (private authService : AuthService,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer
  ) {

    iconRegistry.addSvgIcon(
    'facebook',
    sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg')
  );
  iconRegistry.addSvgIcon(
    'whatsapp',
    sanitizer.bypassSecurityTrustResourceUrl('assets/icons/whatsapp.svg')
  );
  iconRegistry.addSvgIcon(
    'instagram',
    sanitizer.bypassSecurityTrustResourceUrl('assets/icons/instagram.svg')
  );

  }

  ngOnInit() {
    if (this.authService.isLogged()) {
      this.authService.loadUserInfo();
    }
  }
}

