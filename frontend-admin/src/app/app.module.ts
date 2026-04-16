import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    SettingsPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NzButtonModule,
    NzDrawerModule,
    NzDividerModule,
    NzTooltipModule,
    NzIconModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  entryComponents: [
    SettingsPanelComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
