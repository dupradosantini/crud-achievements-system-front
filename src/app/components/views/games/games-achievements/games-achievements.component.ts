import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Achievement } from '../games.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-achievements',
  templateUrl: './games-achievements.component.html',
  styleUrls: ['./games-achievements.component.sass']
})
export class GamesAchievementsComponent implements OnInit {

  placeholderAchievement: Achievement = {
    id: "",
    name: "",
    description: "",
    picture: ""
  }
  achievementArray: Achievement[] = [];
  gameId: Number = 0;
  addArray: Achievement[] = [];

  constructor(private service: GameService, private route:ActivatedRoute, private router: Router){}

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

  createAchievement(achievName: string, achievDesc: string, achievPic: string, modal: any){

    this.placeholderAchievement.name = achievName;
    this.placeholderAchievement.description = achievDesc;
    this.placeholderAchievement.picture = achievPic;

    this.addArray[0] = this.placeholderAchievement;
    console.log(this.addArray);
    this.service.addAchievementToGame(this.gameId,this.addArray)
    .subscribe({
      next: (response) => {
        this.router.navigate([`/games/${this.gameId}/achievements`]);
        this.toggleModal(modal);
        console.log('Achievement Added!');
      },
      error: () => {
        this.toggleModal(modal);
        console.log("Error adding achievement")
      }
    })
    //this.toggleModal(modal);
  }

  toggleModal(modal: any){
    modal.classList.toggle('is-active');
  }

}
