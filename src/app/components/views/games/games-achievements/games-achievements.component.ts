import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Achievement } from '../games.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games-achievements',
  templateUrl: './games-achievements.component.html',
  styleUrls: ['./games-achievements.component.sass']
})
export class GamesAchievementsComponent implements OnInit {

  achievementArray: Achievement[] = [];
  gameId: Number = 0;

  constructor(private service: GameService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.gameId = params['id']); //Extracts the id parameter from url.
    this.getAchievements();
  }

  getAchievements(){
    this.service.findAchivementsByGame(this.gameId)
    .subscribe({
      next: (response) => {
        this.achievementArray = response;
        console.log(this.achievementArray);
      }
    })
  }

}
