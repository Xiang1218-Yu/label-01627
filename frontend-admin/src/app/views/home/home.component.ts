import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as QRCode from 'qrcode';
import { buildDisplayUrl, getEncodedUrlLength, QR_MAX_RECOMMENDED_LENGTH } from '../../utils/network';

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

  constructor(private message: NzMessageService) {}

  ngOnInit(): void {
    const currentPort = window.location.port;
    if (currentPort) {
      this.serverPort = parseInt(currentPort, 10);
    }
  }

  async generateQrCode(): Promise<void> {
    const text = this.inputText.trim();
    if (!text) {
      this.message.warning('请先输入文字内容');
      return;
    }

    if (!this.localIP) {
      this.message.warning('请先在下方网络信息卡片中输入本机局域网 IP');
      return;
    }

    const urlLength = getEncodedUrlLength(this.localIP, this.serverPort, text);
    if (urlLength > QR_MAX_RECOMMENDED_LENGTH) {
      this.message.warning(`文字内容过长（编码后 ${urlLength} 字符），二维码可能难以扫描，建议精简文字`);
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
      this.message.success('二维码生成成功！请用手机扫描');
    } catch (err) {
      console.error('[QR] 二维码生成失败:', err);
      this.message.error('二维码生成失败，请检查输入内容或尝试减少文字量');
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
}
