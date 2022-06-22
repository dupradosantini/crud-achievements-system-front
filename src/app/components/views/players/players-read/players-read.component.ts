import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Achievement, Player, PlayerPage } from '../players.model';


const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_PAGE_SIZE = 1;

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
  lastScrollPosition: number;

  constructor(private service: PlayerService) {
    this.pageNumber=DEFAULT_PAGE_NUMBER;
    this.numberOfElements=DEFAULT_PAGE_SIZE;
    this.totalPages=0;
    this.lastScrollPosition=0;
  }

  ngOnInit(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.getPlayerPage();
  }

  getPlayerPage(){
    this.service.findPlayerPage(this.pageNumber, this.numberOfElements)
    .subscribe( response => {
      this.playerPage = response;
      this.playerArray = this.playerPage.content;
      this.totalPages = response.totalPages;
      console.log("Page: ", response)
      console.log(this.playerArray);
    })
  }

  getRandomAchievements(achivements: Achievement[]): Achievement[]{
    let newAchievArray:Achievement[] = [];
    //console.log("Achiev Length " + achivements.length);
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

  /* INFINITE SCROLLING */
  onScrollDown(ev: any){
    const limit = Math.max( document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight); //Gets the ''bottom'' of the scroll value

    if(this.lastScrollPosition< ev.currentScrollPosition){
      this.numberOfElements = this.numberOfElements.valueOf() + 1;
      this.getMoreElements();
      if(ev.currentScrollPosition === limit){
        this.getLastPlayer();
      }
    }
  }

  getMoreElements(){
    if(this.pageNumber != this.totalPages){
      this.pageNumber = this.pageNumber.valueOf() + 1;
      this.service.findPlayerPage(this.pageNumber, DEFAULT_PAGE_SIZE)
      .subscribe({
        next: (response) => {
          this.playerPage = response;
          for(let i = 0; i<this.playerPage.content.length; i++){
            this.playerArray.push(this.playerPage.content[i]);
          }
        }
      })
    }
  }

  async getLastPlayer(){
    setTimeout(() => { //Reminder : this gets executed after the 300 ms delay.
        this.numberOfElements = DEFAULT_PAGE_SIZE * this.totalPages.valueOf();
        this.getMoreElements();
    }, 300);
  }
}
