const fs = require('fs');
const path = require('path');

// 1. 创建 TranslatePipe
const translatePipeContent = `import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../services/i18n.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  transform(key: string, params?: any): string {
    return this.i18nService.getTranslation(key, params);
  }
}
`;

const pipesDir = path.join(__dirname, 'frontend-admin/src/app/pipes');
if (!fs.existsSync(pipesDir)) {
  fs.mkdirSync(pipesDir, { recursive: true });
}
fs.writeFileSync(path.join(pipesDir, 'translate.pipe.ts'), translatePipeContent, 'utf8');
console.log('Created: translate.pipe.ts');

// 2. 修复 app.module.ts 中的 NzTooltipModule
const appModulePath = path.join(__dirname, 'frontend-admin/src/app/app.module.ts');
let appModuleContent = fs.readFileSync(appModulePath, 'utf8');
appModuleContent = appModuleContent.replace('NzTooltipModule', 'NzToolTipModule');
fs.writeFileSync(appModulePath, appModuleContent, 'utf8');
console.log('Fixed: app.module.ts');

// 3. 修复 app.component.ts 中的 nzViewContainerRef
const appComponentPath = path.join(__dirname, 'frontend-admin/src/app/app.component.ts');
let appComponentContent = fs.readFileSync(appComponentPath, 'utf8');
appComponentContent = appComponentContent.replace(
  '      nzViewContainerRef: this.viewContainerRef,\n',
  ''
);
appComponentContent = appComponentContent.replace(
  "import { Component, OnInit, ViewContainerRef } from '@angular/core';",
  "import { Component, OnInit } from '@angular/core';"
);
appComponentContent = appComponentContent.replace(
  '    private viewContainerRef: ViewContainerRef\n',
  ''
);
fs.writeFileSync(appComponentPath, appComponentContent, 'utf8');
console.log('Fixed: app.component.ts');

console.log('All fixes applied successfully!');
