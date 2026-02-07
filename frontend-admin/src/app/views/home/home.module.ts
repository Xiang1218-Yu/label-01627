import { NgModule } from '@angular/core';
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

import { HomeComponent } from './home.component';
import { TextInputCardComponent } from '../../components/text-input-card/text-input-card.component';
import { QrPreviewCardComponent } from '../../components/qr-preview-card/qr-preview-card.component';
import { NetworkInfoCardComponent } from '../../components/network-info-card/network-info-card.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    TextInputCardComponent,
    QrPreviewCardComponent,
    NetworkInfoCardComponent
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
    NzMessageModule
  ]
})
export class HomeModule {}
