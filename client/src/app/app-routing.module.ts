import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HasNicknameGuard } from './guards/has-nickname.guard';
import { HomeComponent } from './home/home.component';
import { NicknamePickerComponent } from './nickname/nickname-picker.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [HasNicknameGuard],
    component: HomeComponent
  },
  {
    path: 'pick-nickname',
    component: NicknamePickerComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
