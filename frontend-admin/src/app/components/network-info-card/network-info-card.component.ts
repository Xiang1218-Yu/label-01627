import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-network-info-card',
  templateUrl: './network-info-card.component.html',
  styleUrls: ['./network-info-card.component.scss']
})
export class NetworkInfoCardComponent {
  @Input() localIP = '';
  @Input() port = 8081;
  @Output() localIPChange = new EventEmitter<string>();

  manualIP = '';

  constructor(private message: NzMessageService) {}

  applyManualIP(): void {
    const ip = this.manualIP.trim();
    if (!ip) { return; }

    // 简单校验 IPv4 格式
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipv4Regex.test(ip)) {
      this.message.warning('请输入有效的 IPv4 地址');
      return;
    }

    this.localIPChange.emit(ip);
    this.message.success(`已切换为手动 IP: ${ip}`);
  }
}
