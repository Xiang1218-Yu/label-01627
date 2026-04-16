const fs = require('fs');
const path = require('path');

// 修复 home.component.ts 中 i18nService 的访问修饰符
const componentPath = path.join(__dirname, 'frontend-admin/src/app/views/home/home.component.ts');
let componentContent = fs.readFileSync(componentPath, 'utf8');
componentContent = componentContent.replace(
  'private i18nService: I18nService',
  'public i18nService: I18nService'
);
fs.writeFileSync(componentPath, componentContent, 'utf8');
console.log('Fixed: home.component.ts');

console.log('Access modifier fixed successfully!');
