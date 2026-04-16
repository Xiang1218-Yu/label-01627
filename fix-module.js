const fs = require('fs');
const path = require('path');

const content = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { HomeComponent } from './home.component';
import { TextInputCardComponent } from '../../components/text-input-card/text-input-card.component';
import { QrPreviewCardComponent } from '../../components/qr-preview-card/qr-preview-card.component';
import { NetworkInfoCardComponent } from '../../components/network-info-card/network-info-card.component';
import { TranslatePipe } from '../../pipes/translate.pipe';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    TextInputCardComponent,
    QrPreviewCardComponent,
    NetworkInfoCardComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzTagModule,
    NzAlertModule,
    NzStepsModule,
    NzDividerModule,
    NzIconModule,
    NzMessageModule,
    NzDrawerModule
  ]
})
export class HomeModule {}
`;

const filePath = path.join(__dirname, 'frontend-admin/src/app/views/home/home.module.ts');
fs.writeFileSync(filePath, content, 'utf8');
console.log('File written successfully to:', filePath);
