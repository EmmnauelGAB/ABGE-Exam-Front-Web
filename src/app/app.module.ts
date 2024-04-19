import { CUSTOM_ELEMENTS_SCHEMA, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsMX from '@angular/common/locales/es-MX';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';

registerLocaleData(localeEsMX);
const spanishRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) {
    return `0 de ${length}`;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

export function getSpanishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Ítems por página:';
  paginatorIntl.nextPageLabel = 'Siguiente página';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.getRangeLabel = spanishRangeLabel;

  return paginatorIntl;
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    PokemonCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }, { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
