import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterListResponse } from '../model/character-list';
import { CharacterResponse } from '../model/character';
import { ChallengeService } from './challenge.service';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    private readonly baseUrl: string = 'https://gateway.marvel.com/v1/public/characters';

    constructor(private http: HttpClient, private challengeService: ChallengeService) { }

    getCharacters(): Observable<CharacterListResponse> {
        const url: string = `${this.baseUrl}?${this.challengeService.apiKeyHash}`;

        return this.http.get<CharacterListResponse>(url);
    }

    getCharacter(url: string): Observable<CharacterResponse> {
        const finalurl: string = `${url}?${this.challengeService.apiKeyHash}`;

        return this.http.get<CharacterResponse>(finalurl);
    }
}
