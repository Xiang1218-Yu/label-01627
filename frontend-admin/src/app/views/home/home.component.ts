import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as QRCode from 'qrcode';
import { buildDisplayUrl, getEncodedUrlLength, QR_MAX_RECOMMENDED_LENGTH } from '../../utils/network';
import { I18nService, LanguageType } from '../../services/i18n.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  inputText = '';
  qrDataUrl = '';
  displayUrl = '';
  generating = false;
  localIP = '';
  serverPort = 8081;
  settingsVisible = false;

  constructor(
    private message: NzMessageService,
    public i18nService: I18nService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    const currentPort = window.location.port;
    if (currentPort) {
      this.serverPort = parseInt(currentPort, 10);
    }
  }

  async generateQrCode(): Promise<void> {
    const text = this.inputText.trim();
    if (!text) {
      this.message.warning(this.i18nService.translate('messages.enterTextFirst'));
      return;
    }

    if (!this.localIP) {
      this.message.warning(this.i18nService.translate('messages.enterIpFirst'));
      return;
    }

    const urlLength = getEncodedUrlLength(this.localIP, this.serverPort, text);
    if (urlLength > QR_MAX_RECOMMENDED_LENGTH) {
      this.message.warning(this.i18nService.translate('messages.textTooLong', { length: urlLength }));
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
      this.message.success(this.i18nService.translate('messages.qrGenerated'));
    } catch (err) {
      console.error('[QR] 二维码生成失败:', err);
      this.message.error(this.i18nService.translate('messages.qrGenerateFailed'));
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

  changeLanguage(lang: LanguageType): void {
    this.i18nService.setLanguage(lang);
  }

  changeThemeColor(color: string): void {
    this.themeService.setPrimaryColor(color);
  }
}
