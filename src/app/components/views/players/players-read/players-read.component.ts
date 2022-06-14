import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../players.model';


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
      console.log(this.playerArray);
    })
  }

}
