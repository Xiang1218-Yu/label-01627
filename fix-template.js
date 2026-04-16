const fs = require('fs');
const path = require('path');

// 修复 network-info-card.component.html 中的模板语法
// 将 { port } 改为完整的对象语法 { port: port }
const htmlPath = path.join(__dirname, 'frontend-admin/src/app/components/network-info-card/network-info-card.component.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');
htmlContent = htmlContent.replace(
  "{{ getTranslation('network.tip4', { port }) }}",
  "{{ getTranslation('network.tip4', { port: port }) }}"
);
fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('Fixed: network-info-card.component.html');

console.log('Template syntax fixed successfully!');
