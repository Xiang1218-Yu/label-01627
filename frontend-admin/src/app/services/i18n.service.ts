import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { zh_CN, en_US, ja_JP, ko_KR } from 'ng-zorro-antd/i18n';
import { translations } from '../i18n/translations';

export type LanguageType = 'zh' | 'en' | 'ja' | 'ko';

export interface LanguageItem {
  code: LanguageType;
  name: string;
  nativeName: string;
}

export const ngZorroLocales: Record<LanguageType, any> = {
  zh: zh_CN,
  en: en_US,
  ja: ja_JP,
  ko: ko_KR
};

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly STORAGE_KEY = 'app_language';
  private currentLanguageSubject: BehaviorSubject<LanguageType>;
  public currentLanguage$: Observable<LanguageType>;

  public readonly supportedLanguages: LanguageItem[] = [
    { code: 'zh', name: 'Chinese', nativeName: '简体中文' },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' }
  ];

  constructor() {
    const savedLanguage = this.getSavedLanguage();
    this.currentLanguageSubject = new BehaviorSubject<LanguageType>(savedLanguage);
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
  }

  private getSavedLanguage(): LanguageType {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved && this.isSupportedLanguage(saved)) {
      return saved as LanguageType;
    }
    return 'zh';
  }

  private isSupportedLanguage(lang: string): boolean {
    return this.supportedLanguages.some(item => item.code === lang);
  }

  public setLanguage(lang: LanguageType): void {
    if (this.isSupportedLanguage(lang)) {
      localStorage.setItem(this.STORAGE_KEY, lang);
      this.currentLanguageSubject.next(lang);
      window.location.reload();
    }
  }

  public getCurrentLanguage(): LanguageType {
    return this.currentLanguageSubject.value;
  }

  public getLanguageName(lang: LanguageType): string {
    const language = this.supportedLanguages.find(item => item.code === lang);
    return language ? language.nativeName : lang;
  }

  public getCurrentNgZorroLocale(): any {
    return ngZorroLocales[this.getCurrentLanguage()];
  }

  public translate(key: string, params?: Record<string, any>): string {
    const keys = key.split('.');
    let value: any = translations[this.getCurrentLanguage()];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }

    return value;
  }
}
