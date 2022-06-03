import { CommonModule, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxMaskModule } from 'ngx-mask';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudComponent } from './app/crud/crud.component';
import { FooterComponent } from './footer/footer.component';
import { PrevistasListaComponent } from './previstas-lista/previstas-lista.component';
import { PrevistasComponent } from './previstas/previstas.component';
import { RealizadasComponent } from './realizadas/realizadas.component';
import { ResultadosListaComponent } from './resultados-lista/resultados-lista.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    RealizadasComponent,
    PrevistasComponent,
    CrudComponent,
    PrevistasListaComponent,
    ResultadosListaComponent,
    FooterComponent,
    ToolbarComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    MultiSelectModule,
    FieldsetModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    AccordionModule,
    CommonModule,
    HttpClientModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    PaginatorModule,
    ProgressBarModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters:true
    }),
    // ErrorHandler,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    CardModule
    ],

  exports: [TranslateModule],

  providers: [ {provide: LOCALE_ID, useValue: 'pt' },
               {provide: LocationStrategy, useClass: HashLocationStrategy} ],

  bootstrap: [AppComponent]

})
export class AppModule {

 }

export class MyModel{
  value: Date;
}

export function httpTranslateLoader(http: HttpClient):any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
