import { Component, input } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  backgroundImage = input<string | undefined>(undefined);
  bannerLabel = input<string | undefined>(undefined);
  bannerImage = input<string | undefined>(undefined);
  switchLabelImagePosition = input<boolean>(false);
}
