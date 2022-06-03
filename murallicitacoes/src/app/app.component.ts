import { Component, OnInit } from "@angular/core";
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component ({
  selector: 'app-root',
  templateUrl:'app.component.html'
})

export class AppComponent implements OnInit {
  constructor(private config: PrimeNGConfig, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.translate('pt');
  }

  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }
}
