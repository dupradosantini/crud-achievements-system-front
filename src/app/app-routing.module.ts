import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesReadComponent } from './components/views/games/games-read/games-read.component';
import { HomeComponent } from './components/views/home/home.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"games",
    component: GamesReadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
