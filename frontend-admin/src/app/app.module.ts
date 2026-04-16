import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import en from '@angular/common/locales/en';
import ja from '@angular/common/locales/ja';
import ko from '@angular/common/locales/ko';

import { NZ_I18N } from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { I18nService } from './services/i18n.service';
import { ThemeService } from './services/theme.service';
import { TranslatePipe } from './pipes/translate.pipe';

registerLocaleData(zh);
registerLocaleData(en);
registerLocaleData(ja);
registerLocaleData(ko);

export function getNgZorroLocale(i18nService: I18nService): any {
  return i18nService.getCurrentNgZorroLocale();
}

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    I18nService,
    ThemeService,
    {
      provide: NZ_I18N,
      useFactory: getNgZorroLocale,
      deps: [I18nService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
