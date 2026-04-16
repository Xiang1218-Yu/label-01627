const fs = require('fs');
const path = require('path');

// 1. 修复 TranslatePipe 中的方法名
const translatePipePath = path.join(__dirname, 'frontend-admin/src/app/pipes/translate.pipe.ts');
let translatePipeContent = fs.readFileSync(translatePipePath, 'utf8');
translatePipeContent = translatePipeContent.replace(
  'return this.i18nService.getTranslation(key, params);',
  'return this.i18nService.instant(key, params);'
);
fs.writeFileSync(translatePipePath, translatePipeContent, 'utf8');
console.log('Fixed: translate.pipe.ts');

// 2. 完全重写 app.component.ts
const appComponentContent = `import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';

@Component({
  selector: 'app-root',
  template: \`
    <div class="app-container">
      <button
        class="settings-float-btn"
        nz-button
        nzType="primary"
        nzShape="circle"
        (click)="openSettingsPanel()"
        nz-tooltip
        nzTooltipTitle="设置"
      >
        <i nz-icon nzType="setting"></i>
      </button>
      <router-outlet></router-outlet>
    </div>
  \`,
  styles: [\`
    :host {
      display: block;
      min-height: 100vh;
    }

    .app-container {
      position: relative;
      min-height: 100vh;
    }

    .settings-float-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      width: 48px;
      height: 48px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    }
  \`]
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private drawerService: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      this.titleService.setTitle(data.title || '二维码生成器');
    });
  }

  openSettingsPanel(): void {
    this.drawerService.create({
      nzTitle: null,
      nzContent: SettingsPanelComponent,
      nzPlacement: 'right',
      nzWidth: 360,
      nzClosable: false
    });
  }
}
`;

const appComponentPath = path.join(__dirname, 'frontend-admin/src/app/app.component.ts');
fs.writeFileSync(appComponentPath, appComponentContent, 'utf8');
console.log('Fixed: app.component.ts');

console.log('All remaining fixes applied successfully!');
