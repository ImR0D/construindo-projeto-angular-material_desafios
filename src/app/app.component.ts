import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { BannerComponent } from './shared/banner/banner.component';
import { FormularioPassagensComponent } from './shared/formulario-passagens/formulario-passagens.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    BannerComponent,
    FormularioPassagensComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  bg = '/images/banner_background.png';
  imgBanner = '/images/banner_figure_homepage1.png';
  lbBanner = 'Compartilhe milhas, compartilhe o mundo.';
  switchPosition = false;
}
