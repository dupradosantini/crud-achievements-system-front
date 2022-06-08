import { Component, OnInit } from '@angular/core';

interface Game{
  id: number,
  name: string,
  description: string,
  cover_image: string
}

@Component({
  selector: 'app-games-read',
  templateUrl: './games-read.component.html',
  styleUrls: ['./games-read.component.sass']
})
export class GamesReadComponent implements OnInit {

  gameVet:Game[] = [
    {
      id: 1,
      name: "Game 1",
      description: "Description 1",
      cover_image: "imgurl 1"
    },
    {
      id: 2,
      name: "Game 2",
      description: "Description 2",
      cover_image: "imgurl 2"
    },
    {
      id: 3,
      name: "Game 3",
      description: "Description 3",
      cover_image: "imgurl 3"
    },
    {
      id: 4,
      name: "Game 4",
      description: "Description 4",
      cover_image: "imgurl 4"
    }

  ];

  constructor() { }

  ngOnInit(): void {
    console.log(this.gameVet);
  }
}
