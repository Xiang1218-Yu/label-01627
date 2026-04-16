import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

/**
 * 示例项接口
 */
interface ExampleItem {
  /** 示例标签 */
  label: string;
  /** 示例文本内容 */
  text: string;
}

/**
 * 文本输入卡片组件
 * 用于输入要生成二维码的文本内容
 */
@Component({
  selector: 'app-text-input-card',
  templateUrl: './text-input-card.component.html',
  styleUrls: ['./text-input-card.component.scss']
})
export class TextInputCardComponent implements OnChanges {
  /** 输入的文本内容 */
  @Input() text = '';
  /** 是否正在加载中 */
  @Input() loading = false;
  /** 国际化服务实例 */
  @Input() i18nService: I18nService;
  /** 文本内容变化事件 */
  @Output() textChange = new EventEmitter<string>();
  /** 生成二维码事件 */
  @Output() generate = new EventEmitter<void>();

  /** 快捷示例列表 */
  examples: ExampleItem[] = [];

  /**
   * 组件输入属性变化时更新示例列表
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.i18nService && this.i18nService) {
      this.updateExamples();
    }
  }

  /**
   * 根据当前语言更新示例列表
   */
  private updateExamples(): void {
    this.examples = [
      {
        label: this.i18nService.instant('home.exampleNotice'),
        text: this.i18nService.instant('home.exampleNoticeText')
      },
      {
        label: this.i18nService.instant('home.exampleProduct'),
        text: this.i18nService.instant('home.exampleProductText')
      },
      {
        label: this.i18nService.instant('home.exampleInvitation'),
        text: this.i18nService.instant('home.exampleInvitationText')
      }
    ];
  }

  /**
   * 文本输入变化处理
   * @param value 输入的文本值
   */
  onInput(value: string): void {
    this.textChange.emit(value);
  }

  /**
   * 生成二维码按钮点击处理
   */
  onGenerate(): void {
    if (this.text.trim()) {
      this.generate.emit();
    }
  }

  /**
   * 清空内容按钮点击处理
   */
  onClear(): void {
    this.text = '';
    this.textChange.emit('');
  }

  /**
   * 应用快捷示例
   * @param exampleText 示例文本
   */
  applyExample(exampleText: string): void {
    this.text = exampleText;
    this.textChange.emit(exampleText);
  }

  /**
   * 获取翻译文本
   * @param key 翻译键
   * @param params 可选参数
   */
  getTranslation(key: string, params?: any): string {
    return this.i18nService ? this.i18nService.instant(key, params) : key;
  }
}
