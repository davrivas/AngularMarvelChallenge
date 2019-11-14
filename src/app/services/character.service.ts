import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterResponse } from '../model/character';
import { ChallengeService } from './challenge.service';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    private readonly baseUrl: string = 'https://gateway.marvel.com/v1/public/characters';

    constructor(private http: HttpClient) { }

    getCharacters(): Observable<CharacterResponse> {
        const url: string = `${this.baseUrl}?ts=1&apikey=${ChallengeService.PublicKey}&hash=${ChallengeService.MD5Hash}`;

        return this.http.get<CharacterResponse>(url);
    }
}
