import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {
  displayText = '';
  currentTime = '';
  textLines: string[] = [];

  private timerHandle: any = null;

  constructor(
    private route: ActivatedRoute,
    private message: NzMessageService,
    public i18nService: I18nService
  ) {}

  ngOnInit(): void {
    const text = this.route.snapshot.queryParamMap.get('text');
    if (text) {
      this.displayText = text;
      this.textLines = text.split('\n');
    } else {
      const hash = window.location.hash || '';
      const queryIndex = hash.indexOf('?');
      if (queryIndex !== -1) {
        const queryString = hash.substring(queryIndex);
        const params = new URLSearchParams(queryString);
        const fallbackText = params.get('text');
        if (fallbackText) {
          this.displayText = fallbackText;
          this.textLines = fallbackText.split('\n');
        }
      }
    }

    this.updateTime();
    this.timerHandle = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerHandle) {
      clearInterval(this.timerHandle);
      this.timerHandle = null;
    }
  }

  private updateTime(): void {
    const now = new Date();
    const locale = this.i18nService.getCurrentLanguage() === 'zh' ? 'zh-CN' :
                   this.i18nService.getCurrentLanguage() === 'ja' ? 'ja-JP' :
                   this.i18nService.getCurrentLanguage() === 'ko' ? 'ko-KR' : 'en-US';
    this.currentTime = now.toLocaleString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  async copyText(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.displayText);
      this.message.success(this.i18nService.translate('common.copied'));
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = this.displayText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.message.success(this.i18nService.translate('common.copied'));
    }
  }
}
