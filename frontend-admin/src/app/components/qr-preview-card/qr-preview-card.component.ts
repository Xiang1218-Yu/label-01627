import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-qr-preview-card',
  templateUrl: './qr-preview-card.component.html',
  styleUrls: ['./qr-preview-card.component.scss']
})
export class QrPreviewCardComponent implements OnChanges {
  @Input() qrDataUrl = '';
  @Input() displayUrl = '';
  @Input() i18nService: I18nService;

  constructor(private message: NzMessageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.i18nService && this.i18nService) {
    }
  }

  getTranslation(key: string, params?: any): string {
    return this.i18nService ? this.i18nService.instant(key, params) : key;
  }

  handleDownload(): void {
    if (!this.qrDataUrl) { return; }

    const link = document.createElement('a');
    link.download = `qrcode_${Date.now()}.png`;
    link.href = this.qrDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.message.success(this.getTranslation('qrPreview.downloadSuccess'));
  }

  async handleCopy(): Promise<void> {
    if (!this.displayUrl) { return; }

    try {
      await navigator.clipboard.writeText(this.displayUrl);
      this.message.success(this.getTranslation('qrPreview.copySuccess'));
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = this.displayUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.message.success(this.getTranslation('qrPreview.copySuccess'));
    }
  }
}
