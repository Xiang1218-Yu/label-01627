import { Injectable } from '@angular/core';
import { NzI18nService, zh_CN, en_US, ja_JP, ko_KR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import en from '@angular/common/locales/en';
import ja from '@angular/common/locales/ja';
import ko from '@angular/common/locales/ko';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export type LanguageType = 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR';

interface LanguageConfig {
  key: LanguageType;
  name: string;
  ngZorroLocale: any;
  angularLocale: any;
}

const LANGUAGE_CONFIGS: LanguageConfig[] = [
  { key: 'zh-CN', name: '简体中文', ngZorroLocale: zh_CN, angularLocale: zh },
  { key: 'en-US', name: 'English', ngZorroLocale: en_US, angularLocale: en },
  { key: 'ja-JP', name: '日本語', ngZorroLocale: ja_JP, angularLocale: ja },
  { key: 'ko-KR', name: '한국어', ngZorroLocale: ko_KR, angularLocale: ko }
];

const STORAGE_KEY = 'app_language';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLanguageSubject: BehaviorSubject<LanguageType>;
  private translations: any = {};

  constructor(
    private nzI18nService: NzI18nService,
    private http: HttpClient
  ) {
    const savedLang = this.getSavedLanguage();
    this.currentLanguageSubject = new BehaviorSubject<LanguageType>(savedLang);
    this.initializeLanguage(savedLang);
  }

  get currentLanguage$(): Observable<LanguageType> {
    return this.currentLanguageSubject.asObservable();
  }

  get currentLanguage(): LanguageType {
    return this.currentLanguageSubject.value;
  }

  getAvailableLanguages(): LanguageConfig[] {
    return LANGUAGE_CONFIGS;
  }

  switchLanguage(language: LanguageType): Observable<void> {
    return this.loadTranslations(language).pipe(
      tap(() => {
        this.setLanguage(language);
        this.saveLanguage(language);
      })
    );
  }

  instant(key: string, params?: any): string {
    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value === 'string' && params) {
      return this.replaceParams(value, params);
    }

    return typeof value === 'string' ? value : key;
  }

  private initializeLanguage(language: LanguageType): void {
    this.loadTranslations(language).subscribe();
  }

  private loadTranslations(language: LanguageType): Observable<void> {
    return this.http.get(`/assets/i18n/${language}.json`).pipe(
      map((translations: any) => {
        this.translations = translations;
        this.setLanguage(language);
      })
    );
  }

  private setLanguage(language: LanguageType): void {
    const config = LANGUAGE_CONFIGS.find(c => c.key === language);
    if (config) {
      registerLocaleData(config.angularLocale);
      this.nzI18nService.setLocale(config.ngZorroLocale);
      this.currentLanguageSubject.next(language);
    }
  }

  private getSavedLanguage(): LanguageType {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && this.isValidLanguage(saved)) {
      return saved as LanguageType;
    }
    return 'zh-CN';
  }

  private saveLanguage(language: LanguageType): void {
    localStorage.setItem(STORAGE_KEY, language);
  }

  private isValidLanguage(lang: string): boolean {
    return LANGUAGE_CONFIGS.some(c => c.key === lang);
  }

  private replaceParams(str: string, params: any): string {
    return str.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }
}