import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-qr-preview-card',
  templateUrl: './qr-preview-card.component.html',
  styleUrls: ['./qr-preview-card.component.scss']
})
export class QrPreviewCardComponent {
  @Input() qrDataUrl = '';
  @Input() displayUrl = '';

  constructor(
    private message: NzMessageService,
    public i18nService: I18nService
  ) {}

  handleDownload(): void {
    if (!this.qrDataUrl) { return; }

    const link = document.createElement('a');
    link.download = `qrcode_${Date.now()}.png`;
    link.href = this.qrDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.message.success(this.i18nService.translate('qrPreview.download'));
  }

  async handleCopy(): Promise<void> {
    if (!this.displayUrl) { return; }

    try {
      await navigator.clipboard.writeText(this.displayUrl);
      this.message.success(this.i18nService.translate('qrPreview.linkCopied'));
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = this.displayUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.message.success(this.i18nService.translate('qrPreview.linkCopied'));
    }
  }
}
