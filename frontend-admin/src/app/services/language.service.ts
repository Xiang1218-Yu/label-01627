import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzI18nService, zh_CN, en_US, ja_JP, ko_KR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import en from '@angular/common/locales/en';
import ja from '@angular/common/locales/ja';
import ko from '@angular/common/locales/ko';

/**
 * 语言类型定义
 */
export type LanguageType = 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR';

/**
 * 语言服务
 * 提供多语言切换、存储和获取功能
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  /** 本地存储的key */
  private readonly STORAGE_KEY = 'app_language';

  /** 当前语言Subject */
  private currentLanguageSubject = new BehaviorSubject<LanguageType>(this.getDefaultLanguage());

  /** 当前语言Observable */
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(private nzI18nService: NzI18nService) {
    this.initLanguage();
  }

  /**
   * 初始化语言
   */
  private initLanguage(): void {
    const savedLanguage = this.getSavedLanguage();
    this.setLanguage(savedLanguage);
  }

  /**
   * 获取默认语言
   * @returns 默认语言
   */
  private getDefaultLanguage(): LanguageType {
    const browserLang = navigator.language as LanguageType;
    return this.isSupportedLanguage(browserLang) ? browserLang : 'zh-CN';
  }

  /**
   * 获取存储的语言
   * @returns 存储的语言
   */
  private getSavedLanguage(): LanguageType {
    const saved = localStorage.getItem(this.STORAGE_KEY) as LanguageType;
    return saved && this.isSupportedLanguage(saved) ? saved : this.getDefaultLanguage();
  }

  /**
   * 检查语言是否支持
   * @param lang 语言代码
   * @returns 是否支持
   */
  private isSupportedLanguage(lang: string): lang is LanguageType {
    return ['zh-CN', 'en-US', 'ja-JP', 'ko-KR'].includes(lang);
  }

  /**
   * 设置语言
   * @param lang 语言代码
   */
  public setLanguage(lang: LanguageType): void {
    if (!this.isSupportedLanguage(lang)) {
      lang = 'zh-CN';
    }

    // 注册对应语言的locale数据
    switch (lang) {
      case 'zh-CN':
        registerLocaleData(zh);
        this.nzI18nService.setLocale(zh_CN);
        break;
      case 'en-US':
        registerLocaleData(en);
        this.nzI18nService.setLocale(en_US);
        break;
      case 'ja-JP':
        registerLocaleData(ja);
        this.nzI18nService.setLocale(ja_JP);
        break;
      case 'ko-KR':
        registerLocaleData(ko);
        this.nzI18nService.setLocale(ko_KR);
        break;
    }

    // 保存到本地存储
    localStorage.setItem(this.STORAGE_KEY, lang);
    // 通知订阅者语言变化
    this.currentLanguageSubject.next(lang);
  }

  /**
   * 获取当前语言
   * @returns 当前语言
   */
  public getCurrentLanguage(): LanguageType {
    return this.currentLanguageSubject.value;
  }

  /**
   * 获取当前NG-ZORRO的i18n配置
   * @returns NZ_I18N配置
   */
  public getCurrentNzI18n() {
    const lang = this.getCurrentLanguage();
    switch (lang) {
      case 'zh-CN':
        return zh_CN;
      case 'en-US':
        return en_US;
      case 'ja-JP':
        return ja_JP;
      case 'ko-KR':
        return ko_KR;
      default:
        return zh_CN;
    }
  }
}
