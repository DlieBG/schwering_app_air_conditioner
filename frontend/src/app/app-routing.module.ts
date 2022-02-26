import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { WidgetComponent } from './components/widget/widget/widget.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '401', component: UnauthorizedComponent },
  { path: 'widget', component: WidgetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
