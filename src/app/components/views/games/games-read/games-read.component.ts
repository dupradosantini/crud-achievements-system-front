import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Achievement, Game } from '../games.model';
import { Router } from '@angular/router';

const DEFAULT_PAGE_NUMBER = 0;
const DEFAULT_PAGE_SIZE = 2;

@Component({
  selector: 'app-games-read',
  templateUrl: './games-read.component.html',
  styleUrls: ['./games-read.component.sass']
})
export class GamesReadComponent implements OnInit {

  gameVet: Game[]=[];
  gamePage: any;
  pageNumber:Number;
  numberOfElements:Number;
  totalPages:Number;
  selectedGame: any;
  achievVet: Achievement[]=[];

  constructor(private service: GameService, private router: Router) {
    this.pageNumber=DEFAULT_PAGE_NUMBER;
    this.numberOfElements=DEFAULT_PAGE_SIZE;
    this.totalPages=0;
   }

  ngOnInit(): void {
    this.getGamePage();
  }


  getGamePage(){
    this.service.findGamePage(this.pageNumber, this.numberOfElements)
    .subscribe(resposta => {
      this.gamePage = resposta;
      const tamanho = this.gamePage.content.length;
      this.totalPages = resposta.totalPages;
      this.gameVet.length = 0;
      for(let i=0;i<tamanho;i++){
        this.gameVet[i] = this.gamePage.content[i];
      }
    })
  }

  counter(i: Number): Array<Number>{
    return new Array(i);
  }

  goToPage(p: Number){
    this.pageNumber = p;
    this.getGamePage();
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

  getGameById(id: Number, modal: any){
    this.service.findGameById(id)
    .subscribe(response =>{
      this.selectedGame = response;
      this.achievVet = this.selectedGame.achievements;
      console.log(this.selectedGame);
      console.log(this.achievVet);
      this.toggleModal(modal);
    })
  }


  toggleModal(modal: any){
    modal.classList.toggle('is-active');
  }

  goToAchievs(id: Number){
    const pageName = `games/${id}/achievements`;
    this.router.navigate([`${pageName}`]);
  }
}
