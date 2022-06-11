import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game, GamePage } from './games.model';

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
}
