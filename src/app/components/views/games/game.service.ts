import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Achievement, Game, GamePage } from './games.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {


  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) {}

  findGamePage(pageNumber:Number, numberOfElements:Number):Observable<GamePage>{
    const url = `${this.baseUrl}/games?page=${pageNumber}&size=${numberOfElements}`; /*?page=0&size=3 to page*/
    return this.http.get<GamePage>(url);
  }

  findGameById(id: Number):Observable<Game>{
    const url = `${this.baseUrl}/games/${id}`;
    return this.http.get<Game>(url);
  }

  findAchivementsByGame(id: Number): Observable<Achievement[]>{
    const url = `${this.baseUrl}/games/${id}/achievements`;
    return this.http.get<Achievement[]>(url);
  }

  addAchievementToGame(gameId: Number, achievementArray: Achievement[]): Observable<void>{
    const url = `${this.baseUrl}/games/${gameId}/achievements/add`;
    return this.http.put<void>(url,achievementArray);
  }
}
