import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-qr-preview-card',
  templateUrl: './qr-preview-card.component.html',
  styleUrls: ['./qr-preview-card.component.scss']
})
export class QrPreviewCardComponent {
  @Input() qrDataUrl = '';
  @Input() displayUrl = '';

  constructor(private message: NzMessageService) {}

  handleDownload(): void {
    if (!this.qrDataUrl) { return; }

    const link = document.createElement('a');
    link.download = `qrcode_${Date.now()}.png`;
    link.href = this.qrDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.message.success('二维码图片已开始下载');
  }

  async handleCopy(): Promise<void> {
    if (!this.displayUrl) { return; }

    try {
      await navigator.clipboard.writeText(this.displayUrl);
      this.message.success('链接已复制到剪贴板');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = this.displayUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.message.success('链接已复制到剪贴板');
    }
  }
}
