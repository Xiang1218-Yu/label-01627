import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ThemeConfig {
  primaryColor: string;
}

const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#1890ff'
};

const PRESET_COLORS: string[] = [
  '#1890ff',
  '#f5222d',
  '#fa541c',
  '#faad14',
  '#52c41a',
  '#13c2c2',
  '#722ed1',
  '#eb2f96'
];

const STORAGE_KEY = 'app_theme_config';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeConfigSubject: BehaviorSubject<ThemeConfig>;
  private styleElement: HTMLStyleElement | null = null;

  constructor() {
    const savedConfig = this.getSavedThemeConfig();
    this.themeConfigSubject = new BehaviorSubject<ThemeConfig>(savedConfig);
    this.applyTheme(savedConfig);
  }

  get themeConfig$(): Observable<ThemeConfig> {
    return this.themeConfigSubject.asObservable();
  }

  get themeConfig(): ThemeConfig {
    return this.themeConfigSubject.value;
  }

  getPresetColors(): string[] {
    return PRESET_COLORS;
  }

  setPrimaryColor(color: string): void {
    const config = { ...this.themeConfig, primaryColor: color };
    this.updateTheme(config);
  }

  resetTheme(): void {
    this.updateTheme(DEFAULT_THEME);
  }

  private updateTheme(config: ThemeConfig): void {
    this.themeConfigSubject.next(config);
    this.saveThemeConfig(config);
    this.applyTheme(config);
  }

  private applyTheme(config: ThemeConfig): void {
    this.removeStyleElement();
    this.createStyleElement(config);
  }

  private createStyleElement(config: ThemeConfig): void {
    this.styleElement = document.createElement('style');
    this.styleElement.type = 'text/css';
    this.styleElement.id = 'app-theme-styles';

    const css = this.generateCss(config);
    this.styleElement.appendChild(document.createTextNode(css));
    document.head.appendChild(this.styleElement);
  }

  private removeStyleElement(): void {
    if (this.styleElement) {
      document.head.removeChild(this.styleElement);
      this.styleElement = null;
    }
  }

  private generateCss(config: ThemeConfig): string {
    const primaryColor = config.primaryColor;
    const hoverColor = this.lightenColor(primaryColor, 10);
    const activeColor = this.darkenColor(primaryColor, 10);

    return `
      :root {
        --primary-color: ${primaryColor};
        --primary-color-hover: ${hoverColor};
        --primary-color-active: ${activeColor};
      }

      .ant-btn-primary {
        background-color: ${primaryColor};
        border-color: ${primaryColor};
      }

      .ant-btn-primary:hover {
        background-color: ${hoverColor};
        border-color: ${hoverColor};
      }

      .ant-btn-primary:active {
        background-color: ${activeColor};
        border-color: ${activeColor};
      }

      .ant-input:focus,
      .ant-input-focused {
        border-color: ${primaryColor};
        box-shadow: 0 0 0 2px ${this.hexToRgba(primaryColor, 0.2)};
      }

      .ant-select-selection:focus,
      .ant-select-selection-focused,
      .ant-select-open .ant-select-selection {
        border-color: ${primaryColor};
        box-shadow: 0 0 0 2px ${this.hexToRgba(primaryColor, 0.2)};
      }

      .ant-radio-checked .ant-radio-inner {
        border-color: ${primaryColor};
      }

      .ant-radio-inner::after {
        background-color: ${primaryColor};
      }

      .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${primaryColor};
        border-color: ${primaryColor};
      }

      .ant-checkbox-indeterminate .ant-checkbox-inner::after {
        background-color: ${primaryColor};
      }

      .ant-checkbox-wrapper:hover .ant-checkbox-inner,
      .ant-checkbox:hover .ant-checkbox-inner,
      .ant-checkbox-input:focus + .ant-checkbox-inner {
        border-color: ${primaryColor};
      }

      .ant-switch-checked {
        background-color: ${primaryColor};
      }

      .ant-slider-track {
        background-color: ${primaryColor};
      }

      .ant-slider-handle {
        border-color: ${primaryColor};
      }

      .ant-slider-handle:focus {
        border-color: ${primaryColor};
        box-shadow: 0 0 0 5px ${this.hexToRgba(primaryColor, 0.2)};
      }

      .ant-progress-bg {
        background-color: ${primaryColor};
      }

      .ant-tag {
        color: ${primaryColor};
        border-color: ${this.hexToRgba(primaryColor, 0.5)};
        background: ${this.hexToRgba(primaryColor, 0.05)};
      }

      .ant-tag-checkable-checked {
        background-color: ${primaryColor};
      }

      .ant-pagination-item-active {
        border-color: ${primaryColor};
      }

      .ant-pagination-item-active a {
        color: ${primaryColor};
      }

      .ant-pagination-item:hover {
        border-color: ${primaryColor};
      }

      .ant-pagination-item:hover a {
        color: ${primaryColor};
      }

      .ant-menu-item-selected {
        color: ${primaryColor};
      }

      .ant-menu-item-selected::after {
        border-bottom-color: ${primaryColor};
      }

      .ant-menu-item:hover,
      .ant-menu-item-active {
        color: ${primaryColor};
      }

      .ant-menu-item:hover::after,
      .ant-menu-item-active::after {
        border-bottom-color: ${primaryColor};
      }

      .ant-menu-submenu-selected {
        color: ${primaryColor};
      }

      .ant-menu-submenu-title:hover {
        color: ${primaryColor};
      }

      .ant-menu-inline .ant-menu-item::after {
        border-right-color: ${primaryColor};
      }

      .ant-menu-vertical .ant-menu-item::after,
      .ant-menu-vertical-left .ant-menu-item::after,
      .ant-menu-vertical-right .ant-menu-item::after {
        border-right-color: ${primaryColor};
      }

      .ant-tabs-tab-active {
        color: ${primaryColor};
      }

      .ant-tabs-ink-bar {
        background-color: ${primaryColor};
      }

      .ant-tabs-nav .ant-tabs-tab:hover {
        color: ${primaryColor};
      }

      .ant-badge-count {
        background-color: ${primaryColor};
      }

      .ant-calendar-selected-day .ant-calendar-date {
        background-color: ${primaryColor};
      }

      .ant-calendar-today .ant-calendar-date::before {
        border-color: ${primaryColor};
      }

      .ant-calendar-selected-date .ant-calendar-date,
      .ant-calendar-selected-start-date .ant-calendar-date,
      .ant-calendar-selected-end-date .ant-calendar-date {
        background-color: ${primaryColor};
      }

      .ant-calendar-in-range-cell::before {
        background: ${this.hexToRgba(primaryColor, 0.1)};
      }

      .ant-picker-cell-selected .ant-picker-cell-inner,
      .ant-picker-cell-selected:hover .ant-picker-cell-inner {
        background-color: ${primaryColor};
      }

      .ant-picker-today .ant-picker-cell-inner::before {
        border-color: ${primaryColor};
      }

      .ant-picker-cell-in-range::before {
        background: ${this.hexToRgba(primaryColor, 0.1)};
      }

      .ant-tree-node-selected .ant-tree-node-content-wrapper {
        background-color: ${this.hexToRgba(primaryColor, 0.15)};
      }

      .ant-tree-checkbox-checked .ant-tree-checkbox-inner {
        background-color: ${primaryColor};
        border-color: ${primaryColor};
      }

      .ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner::after {
        background-color: ${primaryColor};
      }

      .ant-transfer-list-header-selected {
        color: ${primaryColor};
      }

      .ant-table-thead > tr > th {
        background-color: ${this.hexToRgba(primaryColor, 0.05)};
      }

      .ant-table-tbody > tr.ant-table-row-selected td {
        background-color: ${this.hexToRgba(primaryColor, 0.05)};
      }

      .ant-table-tbody > tr.ant-table-row-selected:hover td {
        background-color: ${this.hexToRgba(primaryColor, 0.08)};
      }

      .ant-table-tbody > tr:hover > td {
        background-color: ${this.hexToRgba(primaryColor, 0.03)};
      }

      .ant-alert-info {
        border-color: ${this.hexToRgba(primaryColor, 0.3)};
        background-color: ${this.hexToRgba(primaryColor, 0.05)};
      }

      .ant-alert-info .ant-alert-icon {
        color: ${primaryColor};
      }

      .ant-message-notice .anticon-info-circle {
        color: ${primaryColor};
      }

      .ant-notification-notice .anticon-info-circle {
        color: ${primaryColor};
      }

      .ant-modal-confirm-info .ant-modal-confirm-body > .anticon {
        color: ${primaryColor};
      }

      .ant-popover-message > .anticon-info-circle {
        color: ${primaryColor};
      }

      .ant-timeline-item-head-blue {
        color: ${primaryColor};
        border-color: ${primaryColor};
      }

      .ant-timeline-item-head-custom {
        color: ${primaryColor};
        border-color: ${primaryColor};
        background-color: #fff;
      }

      .ant-steps-item-finish .ant-steps-item-icon {
        border-color: ${primaryColor};
        background-color: ${primaryColor};
      }

      .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
        color: #fff;
      }

      .ant-steps-item-finish .ant-steps-item-title::after {
        background-color: ${primaryColor};
      }

      .ant-steps-item-process .ant-steps-item-icon {
        border-color: ${primaryColor};
        background-color: #fff;
      }

      .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
        color: ${primaryColor};
      }

      .ant-result-info .ant-result-icon {
        color: ${primaryColor};
      }

      .ant-page-header-heading-title {
        color: ${primaryColor};
      }

      .ant-descriptions-item-label {
        color: ${primaryColor};
      }

      .ant-list-item-meta-title > a:hover {
        color: ${primaryColor};
      }

      .ant-comment-actions > li > span:hover {
        color: ${primaryColor};
      }

      .ant-anchor-link-title:hover,
      .ant-anchor-link-active > .ant-anchor-link-title {
        color: ${primaryColor};
      }

      .ant-anchor-ink-ball {
        border-color: ${primaryColor};
      }

      .ant-back-top-content {
        background-color: ${primaryColor};
      }

      .ant-back-top-content:hover {
        background-color: ${hoverColor};
      }

      .ant-float-btn-primary .ant-float-btn-body {
        background-color: ${primaryColor};
      }

      .ant-float-btn-primary .ant-float-btn-body:hover {
        background-color: ${hoverColor};
      }

      .ant-typography a {
        color: ${primaryColor};
      }

      .ant-typography a:hover {
        color: ${hoverColor};
      }

      .ant-typography a:active {
        color: ${activeColor};
      }

      a {
        color: ${primaryColor};
      }

      a:hover {
        color: ${hoverColor};
      }

      a:active {
        color: ${activeColor};
      }
    `;
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private lightenColor(hex: string, percent: number): string {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const r = Math.min(255, (num >> 16) + amt);
    const g = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const b = Math.min(255, (num & 0x0000ff) + amt);
    return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`;
  }

  private darkenColor(hex: string, percent: number): string {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const r = Math.max(0, (num >> 16) - amt);
    const g = Math.max(0, ((num >> 8) & 0x00ff) - amt);
    const b = Math.max(0, (num & 0x0000ff) - amt);
    return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`;
  }

  private getSavedThemeConfig(): ThemeConfig {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_THEME;
      }
    }
    return DEFAULT_THEME;
  }

  private saveThemeConfig(config: ThemeConfig): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
}