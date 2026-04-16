import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as QRCode from 'qrcode';
import { Subscription } from 'rxjs';
import { buildDisplayUrl, getEncodedUrlLength, QR_MAX_RECOMMENDED_LENGTH } from '../../utils/network';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  inputText = '';
  qrDataUrl = '';
  displayUrl = '';
  generating = false;
  localIP = '';
  serverPort = 8081;

  private languageSubscription: Subscription;

  constructor(
    private message: NzMessageService,
    public i18nService: I18nService
  ) {
    this.languageSubscription = this.i18nService.currentLanguage$.subscribe(() => {
      if (this.qrDataUrl && this.inputText.trim()) {
        this.message.success(this.i18nService.instant('home.generateSuccess'));
      }
    });
  }

  ngOnInit(): void {
    const currentPort = window.location.port;
    if (currentPort) {
      this.serverPort = parseInt(currentPort, 10);
    }
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  async generateQrCode(): Promise<void> {
    const text = this.inputText.trim();
    if (!text) {
      this.message.warning(this.i18nService.instant('home.inputEmptyWarning'));
      return;
    }

    if (!this.localIP) {
      this.message.warning(this.i18nService.instant('home.ipEmptyWarning'));
      return;
    }

    const urlLength = getEncodedUrlLength(this.localIP, this.serverPort, text);
    if (urlLength > QR_MAX_RECOMMENDED_LENGTH) {
      const warningMsg = this.i18nService.instant('home.lengthWarning', { length: urlLength });
      this.message.warning(warningMsg);
      console.warn(`[QR] URL 长度 ${urlLength} 超过推荐上限 ${QR_MAX_RECOMMENDED_LENGTH}`);
    }

    this.generating = true;

    try {
      const url = buildDisplayUrl(this.localIP, this.serverPort, text);
      this.displayUrl = url;
      console.info('[QR] 生成二维码 URL:', url);

      const dataUrl = await QRCode.toDataURL(url, {
        width: 440,
        margin: 2,
        color: {
          dark: '#303133',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      });

      this.qrDataUrl = dataUrl;
      this.message.success(this.i18nService.instant('home.generateSuccess'));
    } catch (err) {
      console.error('[QR] 二维码生成失败:', err);
      this.message.error(this.i18nService.instant('home.generateFailed'));
    } finally {
      this.generating = false;
    }
  }

  handleIPUpdate(ip: string): void {
    this.localIP = ip;
    if (this.qrDataUrl && this.inputText.trim()) {
      this.generateQrCode();
    }
  }

  getTranslation(key: string, params?: any): string {
    return this.i18nService.instant(key, params);
  }
}
