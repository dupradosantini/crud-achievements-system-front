import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/shared/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { GamesAchievementsComponent } from './components/views/games/games-achievements/games-achievements.component';
import { GamesReadComponent } from './components/views/games/games-read/games-read.component';
import { HomeComponent } from './components/views/home/home.component';
import { PlayersReadComponent } from './components/views/players/players-read/players-read.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"games",
    component: GamesReadComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"players",
    component: PlayersReadComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: "games/:id/achievements",
    component: GamesAchievementsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"signup",
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
