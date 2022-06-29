import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleButton(navBurger: any, navMenu: any){
    console.log(navBurger);
    navBurger.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
  }

  share(){
    const shareData = {
      title: 'Achievement Tracker',
      text: "Track your games's achievements progress with this app!",
      url: 'https://github.com/stars/dupradosantini/lists/opus-challenge'
    };
    try {
      navigator.share(shareData);
      console.log('Shared successfully');
    } catch(err) {
      console.log('Error: ' + err);
    }
  }
}
