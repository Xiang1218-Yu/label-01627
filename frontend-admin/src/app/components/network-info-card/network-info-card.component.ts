import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { I18nService } from '../../services/i18n.service';

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

  constructor(
    private message: NzMessageService,
    public i18nService: I18nService
  ) {}

  applyManualIP(): void {
    const ip = this.manualIP.trim();
    if (!ip) { return; }

    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipv4Regex.test(ip)) {
      this.message.warning(this.i18nService.translate('messages.enterIpFirst'));
      return;
    }

    this.localIPChange.emit(ip);
    this.message.success(this.i18nService.translate('networkInfo.applied'));
  }
}
