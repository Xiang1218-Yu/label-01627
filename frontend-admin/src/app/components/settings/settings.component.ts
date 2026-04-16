import { Component, OnInit } from '@angular/core';
import { LanguageService, LanguageType } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

/**
 * 设置组件
 * 提供语言切换、主题自定义功能
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  /** 当前选中的语言 */
  public selectedLanguage: LanguageType;

  /** 当前选中的主色 */
  public selectedColor: string;

  /** 语言选项 */
  public languageOptions = [
    { value: 'zh-CN', label: '简体中文' },
    { value: 'en-US', label: 'English' },
    { value: 'ja-JP', label: '日本語' },
    { value: 'ko-KR', label: '한국어' }
  ];

  /** 预设颜色选项 */
  public presetColors = [
    { value: '#1890ff', label: '默认蓝' },
    { value: '#f5222d', label: '薄暮红' },
    { value: '#fa541c', label: '火山橙' },
    { value: '#faad14', label: '日暮黄' },
    { value: '#52c41a', label: '极光绿' },
    { value: '#13c2c2', label: '明青' },
    { value: '#2f54eb', label: '极客蓝' },
    { value: '#722ed1', label: '酱紫' },
    { value: '#eb2f96', label: '洋红' }
  ];

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    // 初始化当前语言和主题
    this.selectedLanguage = this.languageService.getCurrentLanguage();
    this.selectedColor = this.themeService.getCurrentTheme().primaryColor;
  }

  /**
   * 切换语言
   * @param lang 语言代码
   */
  public onLanguageChange(lang: LanguageType): void {
    this.languageService.setLanguage(lang);
  }

  /**
   * 切换主题颜色
   * @param color 颜色值
   */
  public onColorChange(color: string): void {
    this.selectedColor = color;
    this.themeService.setTheme({ primaryColor: color });
  }

  /**
   * 自定义颜色变化
   */
  public onCustomColorChange(): void {
    if (this.selectedColor) {
      this.themeService.setTheme({ primaryColor: this.selectedColor });
    }
  }

  /**
   * 重置主题
   */
  public onResetTheme(): void {
    this.themeService.resetTheme();
    this.selectedColor = this.themeService.getCurrentTheme().primaryColor;
  }

  /**
   * 关闭弹窗
   */
  public onClose(): void {
    this.modalRef.close();
  }
}
