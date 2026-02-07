import { Component, Input, Output, EventEmitter } from '@angular/core';

interface ExampleItem {
  label: string;
  text: string;
}

@Component({
  selector: 'app-text-input-card',
  templateUrl: './text-input-card.component.html',
  styleUrls: ['./text-input-card.component.scss']
})
export class TextInputCardComponent {
  @Input() text = '';
  @Input() loading = false;
  @Output() textChange = new EventEmitter<string>();
  @Output() generate = new EventEmitter<void>();

  examples: ExampleItem[] = [
    {
      label: '公告通知',
      text: '【重要通知】\n\n尊敬的各位同事：\n\n公司将于2026年2月10日（周二）下午14:00在三楼会议室召开年度总结大会，请各部门负责人准时参加。\n\n请提前准备好部门年度工作总结和新年度计划。\n\n—— 行政部'
    },
    {
      label: '产品介绍',
      text: '【智能家居控制中心 Pro】\n\n一款革命性的智能家居产品：\n\n✅ 支持语音控制全屋设备\n✅ AI 智能场景推荐\n✅ 兼容 1000+ 品牌设备\n✅ 远程手机 APP 操控\n\n售价：¥599\n官网：www.example.com'
    },
    {
      label: '活动邀请',
      text: '🎉 邀请函\n\n诚邀您参加「2026春季技术分享会」\n\n📅 时间：2026年3月15日 09:00-17:00\n📍 地点：科技园区 A 座报告厅\n🎯 主题：前端工程化与AI辅助开发\n\n议程亮点：\n• Vue 3 深度实践分享\n• AI Copilot 提效秘籍\n• 微前端架构落地经验\n\n期待您的到来！'
    }
  ];

  onInput(value: string): void {
    this.textChange.emit(value);
  }

  onGenerate(): void {
    if (this.text.trim()) {
      this.generate.emit();
    }
  }

  onClear(): void {
    this.text = '';
    this.textChange.emit('');
  }

  applyExample(exampleText: string): void {
    this.text = exampleText;
    this.textChange.emit(exampleText);
  }
}
