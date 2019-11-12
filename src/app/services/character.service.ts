import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootObject as Character } from '../model/character';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    private readonly baseUrl: string = 'http://gateway.marvel.com/v1/public/characters';

    constructor(private http: HttpClient) {}

    getCharacters(): Observable<Character> {
        return this.http.get<Character>(this.baseUrl);
    }
}
