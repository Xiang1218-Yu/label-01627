import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ThemeConfig {
  primaryColor: string;
  headerGradientStart: string;
  headerGradientEnd: string;
  cardHeaderBg: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'app_theme_color';
  private currentThemeSubject: BehaviorSubject<ThemeConfig>;
  public currentTheme$: Observable<ThemeConfig>;

  public readonly presetColors: Array<{ name: string; color: string }> = [
    { name: 'Ant Design Blue', color: '#1890ff' },
    { name: 'Dawn Pink', color: '#f5222d' },
    { name: 'Sunset Orange', color: '#fa541c' },
    { name: 'Golden Yellow', color: '#faad14' },
    { name: 'Lime Green', color: '#52c41a' },
    { name: 'Polar Green', color: '#13c2c2' },
    { name: 'Daybreak Blue', color: '#1890ff' },
    { name: 'Golden Purple', color: '#722ed1' },
    { name: 'Magenta', color: '#eb2f96' }
  ];

  private readonly defaultTheme: ThemeConfig = {
    primaryColor: '#1890ff',
    headerGradientStart: '#667eea',
    headerGradientEnd: '#764ba2',
    cardHeaderBg: '#f0f5ff'
  };

  constructor() {
    const savedColor = this.getSavedColor();
    const theme = this.createThemeFromColor(savedColor);
    this.currentThemeSubject = new BehaviorSubject<ThemeConfig>(theme);
    this.currentTheme$ = this.currentThemeSubject.asObservable();
    this.applyTheme(theme);
  }

  private getSavedColor(): string {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved || this.defaultTheme.primaryColor;
  }

  private createThemeFromColor(primaryColor: string): ThemeConfig {
    const hsl = this.hexToHsl(primaryColor);
    const lighterColor = this.adjustLightness(primaryColor, 30);
    const darkerColor = this.adjustLightness(primaryColor, -20);

    return {
      primaryColor: primaryColor,
      headerGradientStart: lighterColor,
      headerGradientEnd: darkerColor,
      cardHeaderBg: this.adjustLightness(primaryColor, 45)
    };
  }

  private hexToHsl(hex: string): { h: number; s: number; l: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) {
      return { h: 0, s: 0, l: 0 };
    }

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  private hslToHex(h: number, s: number, l: number): string {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  private adjustLightness(hex: string, amount: number): string {
    const hsl = this.hexToHsl(hex);
    hsl.l = Math.min(100, Math.max(0, hsl.l + amount));
    return this.hslToHex(hsl.h, hsl.s, hsl.l);
  }

  public setPrimaryColor(color: string): void {
    const theme = this.createThemeFromColor(color);
    localStorage.setItem(this.STORAGE_KEY, color);
    this.currentThemeSubject.next(theme);
    this.applyTheme(theme);
  }

  public getCurrentTheme(): ThemeConfig {
    return this.currentThemeSubject.value;
  }

  public getCurrentPrimaryColor(): string {
    return this.currentThemeSubject.value.primaryColor;
  }

  private applyTheme(theme: ThemeConfig): void {
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--header-gradient-start', theme.headerGradientStart);
    document.documentElement.style.setProperty('--header-gradient-end', theme.headerGradientEnd);
    document.documentElement.style.setProperty('--card-header-bg', theme.cardHeaderBg);
  }

  public resetToDefault(): void {
    this.setPrimaryColor(this.defaultTheme.primaryColor);
  }
}
