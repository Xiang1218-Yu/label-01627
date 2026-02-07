import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    // 从 URL query 参数中解析文本
    const text = this.route.snapshot.queryParamMap.get('text');
    if (text) {
      this.displayText = text;
      this.textLines = text.split('\n');
    } else {
      // 兜底：Hash 模式下从 window.location.hash 中手动解析 query 参数
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
    this.currentTime = now.toLocaleString('zh-CN', {
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
      this.message.success('文字已复制');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = this.displayText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.message.success('文字已复制');
    }
  }
}
