import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-network-info-card',
  templateUrl: './network-info-card.component.html',
  styleUrls: ['./network-info-card.component.scss']
})
export class NetworkInfoCardComponent implements OnChanges {
  @Input() localIP = '';
  @Input() port = 8081;
  @Input() i18nService: I18nService;
  @Output() localIPChange = new EventEmitter<string>();

  manualIP = '';

  constructor(private message: NzMessageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.i18nService && this.i18nService) {
    }
  }

  getTranslation(key: string, params?: any): string {
    return this.i18nService ? this.i18nService.instant(key, params) : key;
  }

  applyManualIP(): void {
    const ip = this.manualIP.trim();
    if (!ip) { return; }

    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipv4Regex.test(ip)) {
      this.message.warning(this.getTranslation('network.invalidIpWarning'));
      return;
    }

    this.localIPChange.emit(ip);
    this.message.success(this.getTranslation('network.ipApplied', { ip }));
  }
}
