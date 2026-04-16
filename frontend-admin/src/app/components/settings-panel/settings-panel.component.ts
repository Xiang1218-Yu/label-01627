import { Component, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { I18nService, LanguageType } from '../../services/i18n.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss']
})
export class SettingsPanelComponent implements OnInit {
  currentLanguage: LanguageType;
  availableLanguages: any[];
  presetColors: string[];
  selectedColor: string;
  customColor: string;

  constructor(
    private drawerRef: NzDrawerRef,
    private i18nService: I18nService,
    private themeService: ThemeService
  ) {
    this.currentLanguage = this.i18nService.currentLanguage;
    this.availableLanguages = this.i18nService.getAvailableLanguages();
    this.presetColors = this.themeService.getPresetColors();
    this.selectedColor = this.themeService.themeConfig.primaryColor;
    this.customColor = this.selectedColor;
  }

  ngOnInit(): void {}

  onLanguageChange(language: LanguageType): void {
    this.i18nService.switchLanguage(language).subscribe(() => {
      this.currentLanguage = language;
    });
  }

  onColorSelect(color: string): void {
    this.selectedColor = color;
    this.customColor = color;
    this.themeService.setPrimaryColor(color);
  }

  onCustomColorChange(color: string): void {
    this.selectedColor = color;
    this.themeService.setPrimaryColor(color);
  }

  onResetTheme(): void {
    this.themeService.resetTheme();
    this.selectedColor = this.themeService.themeConfig.primaryColor;
    this.customColor = this.selectedColor;
  }

  close(): void {
    this.drawerRef.close();
  }

  getTranslation(key: string, params?: any): string {
    return this.i18nService.instant(key, params);
  }
}