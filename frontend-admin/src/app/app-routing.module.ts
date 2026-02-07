import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
    data: { title: '二维码生成器' }
  },
  {
    path: 'display',
    loadChildren: () => import('./views/display/display.module').then(m => m.DisplayModule),
    data: { title: '内容展示' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
