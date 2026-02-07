import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { DisplayComponent } from './display.component';

const routes: Routes = [
  { path: '', component: DisplayComponent }
];

@NgModule({
  declarations: [
    DisplayComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzButtonModule,
    NzIconModule,
    NzMessageModule
  ]
})
export class DisplayModule {}
