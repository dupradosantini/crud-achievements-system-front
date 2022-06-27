import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesAchievementsComponent } from './components/views/games/games-achievements/games-achievements.component';
import { GamesReadComponent } from './components/views/games/games-read/games-read.component';
import { HomeComponent } from './components/views/home/home.component';
import { PlayersReadComponent } from './components/views/players/players-read/players-read.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"games",
    component: GamesReadComponent
  },
  {
    path:"players",
    component: PlayersReadComponent
  }
  ,
  {
    path: "games/:id/achievements",
    component: GamesAchievementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
