import { Component, Input, Output, EventEmitter } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { translations } from '../../i18n/translations';

interface ExampleItem {
  label: string;
  text: string;
}

@Component({
  selector: 'app-text-input-card',
  templateUrl: './text-input-card.component.html',
  styleUrls: ['./text-input-card.component.scss']
})
export class TextInputCardComponent {
  @Input() text = '';
  @Input() loading = false;
  @Output() textChange = new EventEmitter<string>();
  @Output() generate = new EventEmitter<void>();

  constructor(public i18nService: I18nService) {}

  get examples(): ExampleItem[] {
    const lang = this.i18nService.getCurrentLanguage();
    const t = translations[lang];
    return [
      {
        label: '示例 1',
        text: t.home.sampleText1
      },
      {
        label: '示例 2',
        text: t.home.sampleText2
      },
      {
        label: '示例 3',
        text: t.home.sampleText3
      }
    ];
  }

  onInput(value: string): void {
    this.textChange.emit(value);
  }

  onGenerate(): void {
    if (this.text.trim()) {
      this.generate.emit();
    }
  }

  onClear(): void {
    this.text = '';
    this.textChange.emit('');
  }

  applyExample(exampleText: string): void {
    this.text = exampleText;
    this.textChange.emit(exampleText);
  }
}
