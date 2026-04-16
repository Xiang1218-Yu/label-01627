import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import en from '@angular/common/locales/en';
import ja from '@angular/common/locales/ja';
import ko from '@angular/common/locales/ko';

import { NZ_I18N, zh_CN, en_US, ja_JP, ko_KR } from 'ng-zorro-antd/i18n';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';
import { SettingsComponent } from './components/settings/settings.component';

registerLocaleData(zh);
registerLocaleData(en);
registerLocaleData(ja);
registerLocaleData(ko);

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NzRadioModule,
    NzButtonModule,
    NzToolTipModule,
    NzModalModule
  ],
  entryComponents: [
    SettingsComponent
  ],
  providers: [
    LanguageService,
    ThemeService,
    {
      provide: NZ_I18N,
      useFactory: (languageService: LanguageService) => languageService.getCurrentNzI18n(),
      deps: [LanguageService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
