import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Achievement, Player } from '../players.model';


const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_PAGE_SIZE = 5;

@Component({
  selector: 'app-players-read',
  templateUrl: './players-read.component.html',
  styleUrls: ['./players-read.component.sass']
})
export class PlayersReadComponent implements OnInit {

  playerArray: Player[]=[];
  playerPage: any;
  pageNumber: Number;
  numberOfElements: Number;
  totalPages:Number;

  constructor(private service: PlayerService) {
    this.pageNumber=DEFAULT_PAGE_NUMBER;
    this.numberOfElements=DEFAULT_PAGE_SIZE;
    this.totalPages=0;
  }

  ngOnInit(): void {
    this.getPlayerPage();
  }

  getPlayerPage(){
    this.service.findPlayerPage(this.pageNumber, this.numberOfElements)
    .subscribe( response => {
      this.playerPage = response;
      this.playerArray = this.playerPage.content;
      this.totalPages = response.totalPages;
      console.log(this.playerArray);
    })
  }

  getRandomAchievements(achivements: Achievement[]): Achievement[]{
    let newAchievArray:Achievement[] = [];
    console.log("Achiev Length " + achivements.length);
    if(achivements.length > 0){
      //console.log(achivements.length);
      const numbers = [];
      const slice = 4;
      let n,p;
      for(let i = 0; i<slice; i++){
        do{
          n = Math.floor(Math.random() * achivements.length ) + 0;
          p = numbers.includes(n);
          if(!p){
            numbers.push(n);
            newAchievArray[i] = achivements[n];
          }
        }while(p);
      }
      return newAchievArray;
    }else{
      return newAchievArray;
    }
  }

  /* PAGING METHODS */
  counter(i: Number): Array<Number>{
    return new Array(i);
  }

  goToPage(p: Number){
    this.pageNumber = p;
    this.getPlayerPage();
  }

  goToNext(){
    if(this.pageNumber == (this.totalPages.valueOf() - 1)){
      this.goToPage(this.pageNumber.valueOf());
    }else{
      this.pageNumber = this.pageNumber.valueOf() + 1;
      this.goToPage(this.pageNumber.valueOf());
    }
  }

  goToPrevious(){
    if(this.pageNumber == 0){
      this.goToPage(this.pageNumber.valueOf());
    }else{
      this.pageNumber = this.pageNumber.valueOf() - 1;
      this.goToPage(this.pageNumber.valueOf());
    }
  }
}
