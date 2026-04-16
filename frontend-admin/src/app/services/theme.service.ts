import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * 主题配置类型
 */
export interface ThemeConfig {
  /** 主题主色 */
  primaryColor: string;
  /** 主题名称 */
  themeName: string;
}

/**
 * 主题服务
 * 提供主题切换、颜色自定义功能
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /** 本地存储的key */
  private readonly STORAGE_KEY = 'app_theme_config';

  /** 默认主题配置 */
  private readonly DEFAULT_THEME: ThemeConfig = {
    primaryColor: '#1890ff',
    themeName: 'default'
  };

  /** 当前主题Subject */
  private currentThemeSubject = new BehaviorSubject<ThemeConfig>(this.getSavedTheme());

  /** 当前主题Observable */
  public currentTheme$ = this.currentThemeSubject.asObservable();

  constructor() {
    this.initTheme();
  }

  /**
   * 初始化主题
   */
  private initTheme(): void {
    const savedTheme = this.getSavedTheme();
    this.applyTheme(savedTheme);
  }

  /**
   * 获取存储的主题配置
   * @returns 存储的主题配置
   */
  private getSavedTheme(): ThemeConfig {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : this.DEFAULT_THEME;
  }

  /**
   * 设置主题配置
   * @param config 主题配置
   */
  public setTheme(config: Partial<ThemeConfig>): void {
    const currentConfig = this.currentThemeSubject.value;
    const newConfig = { ...currentConfig, ...config };
    
    // 保存到本地存储
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newConfig));
    // 应用主题
    this.applyTheme(newConfig);
    // 通知订阅者主题变化
    this.currentThemeSubject.next(newConfig);
  }

  /**
   * 应用主题到DOM
   * @param config 主题配置
   */
  private applyTheme(config: ThemeConfig): void {
    // 修改CSS变量
    document.documentElement.style.setProperty('--primary-color', config.primaryColor);
    
    // 动态修改NG-ZORRO的主色
    // 注入样式到head
    const styleId = 'custom-theme-style';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `
      .ant-btn-primary {
        background-color: ${config.primaryColor} !important;
        border-color: ${config.primaryColor} !important;
      }
      .ant-btn-primary:hover,
      .ant-btn-primary:focus {
        background-color: ${this.lightenDarkenColor(config.primaryColor, 10)} !important;
        border-color: ${this.lightenDarkenColor(config.primaryColor, 10)} !important;
      }
      .ant-menu-item-selected,
      .ant-menu-item-active {
        color: ${config.primaryColor} !important;
      }
      .ant-menu-item-selected::after,
      .ant-menu-item-active::after {
        border-right-color: ${config.primaryColor} !important;
      }
      .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${config.primaryColor} !important;
        border-color: ${config.primaryColor} !important;
      }
      .ant-input:focus,
      .ant-input-focused {
        border-color: ${config.primaryColor} !important;
        box-shadow: 0 0 0 2px ${this.hexToRgba(config.primaryColor, 0.2)} !important;
      }
      .ant-radio-checked .ant-radio-inner {
        border-color: ${config.primaryColor} !important;
      }
      .ant-radio-inner::after {
        background-color: ${config.primaryColor} !important;
      }
      a {
        color: ${config.primaryColor} !important;
      }
      a:hover {
        color: ${this.lightenDarkenColor(config.primaryColor, 10)} !important;
      }
      .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${config.primaryColor} !important;
      }
      .ant-tabs-ink-bar {
        background: ${config.primaryColor} !important;
      }
    `;
  }

  /**
   * 获取当前主题配置
   * @returns 当前主题配置
   */
  public getCurrentTheme(): ThemeConfig {
    return this.currentThemeSubject.value;
  }

  /**
   * 重置主题为默认
   */
  public resetTheme(): void {
    this.setTheme(this.DEFAULT_THEME);
  }

  /**
   * 颜色加深/减淡工具函数
   * @param color 十六进制颜色
   * @param percent 百分比，正数加深，负数减淡
   * @returns 处理后的颜色
   */
  private lightenDarkenColor(color: string, percent: number): string {
    color = color.replace('#', '');
    const num = parseInt(color, 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + 
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + 
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + 
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  }

  /**
   * 十六进制颜色转RGBA
   * @param hex 十六进制颜色
   * @param alpha 透明度
   * @returns RGBA颜色字符串
   */
  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
