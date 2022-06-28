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
  isEdit: boolean;
  editSuccess: boolean;
  editFail:boolean;

  constructor(private service: GameService, private router: Router) {
    this.pageNumber=DEFAULT_PAGE_NUMBER;
    this.numberOfElements=DEFAULT_PAGE_SIZE;
    this.totalPages=0;
    this.isEdit=false;
    this.editSuccess=false;
    this.editFail=false;
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
    this.isEdit=true;
    this.service.findGameById(id)
    .subscribe(response =>{
      this.selectedGame = response;
      nameInput.value = this.selectedGame.name;
      genreInput.value = this.selectedGame.genre;
      coverImgInput.value = this.selectedGame.cover_image;
      this.toggleModal(modal);
    })
  }

  editSubmit(gameName: string, gameGenre: string, gameImg: string, modal: any){
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
        this.successRequest(modal,response);
      },
      error: () => {
        this.failedRequest(modal);
      }
    })
  }

  createGame(modal: any, nameInput: any, genreInput: any, coverImgInput: any){
    this.isEdit=false;
    nameInput.value = "";
    genreInput.value = "";
    coverImgInput.value = "";
    this.toggleModal(modal);
  }

  createSubmit(gameName: string, gameGenre: string, gameImg: string, modal: any){
    const placeholderGame: GameUpdateObj = {
      id: 0,
      name: gameName,
      genre: gameGenre,
      cover_image: gameImg
    }
    console.log(placeholderGame);
    //call for post service
    this.service.createGame(placeholderGame)
    .subscribe({
      next: (response) => {
        this.successRequest(modal,response);
      },
      error: () => this.failedRequest(modal)
    })
  }


  toggleModal(modal: any){
    modal.classList.toggle('is-active');
  }

  goToAchievs(id: Number){
    const pageName = `games/${id}/achievements`;
    this.router.navigate([`${pageName}`]);
  }

  closeNotification(){
    this.editSuccess=false;
    this.editFail=false;
  }

  successRequest(modal: any, response:any){
    this.toggleModal(modal);
    this.getGamePage();
    if(this.isEdit===true){
      console.log("Update Successful");
    }else{
      console.log("Create Successfull");
    }
    this.editSuccess=true;
    console.log(response);
  }

  failedRequest(modal: any){
    this.toggleModal(modal);
    if(this.isEdit===true){
      console.log("Update Failed");
    }else{
      console.log("Create Failed");
    }
    this.editFail=true;
  }

}
