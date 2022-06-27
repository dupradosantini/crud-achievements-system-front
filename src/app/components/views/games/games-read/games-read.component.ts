import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game, GameUpdateObj } from '../games.model';
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

  editGame(id: Number, modal: any, nameInput: any, genreInput: any, coverImgInput: any){
    this.service.findGameById(id)
    .subscribe(response =>{
      this.selectedGame = response;
      nameInput.value = this.selectedGame.name;
      genreInput.value = this.selectedGame.genre;
      coverImgInput.value = this.selectedGame.cover_image;
      this.toggleModal(modal);
    })
  }

  formSubmit(gameName: string, gameGenre: string, gameImg: string, modal: any){
    const placeholderGame: GameUpdateObj = {
      id: this.selectedGame.id,
      name: gameName,
      genre: gameGenre,
      cover_image: gameImg
    }
    console.log(placeholderGame);
    this.service.updateGame(placeholderGame)
    .subscribe({
      next: (response) => {
        this.toggleModal(modal);
        this.getGamePage();
        console.log('Game Updated!');
        console.log(response);
      },
      error: () => {
        this.toggleModal(modal);
        console.log("Error updating")
      }
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
