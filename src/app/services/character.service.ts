import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterResponse } from '../model/character';
import { ChallengeService } from './challenge.service';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    private readonly baseUrl: string = 'https://gateway.marvel.com/v1/public/characters';

    constructor(private http: HttpClient, private challengeService: ChallengeService) { }

    getCharacters(nameStartsWith: string = null, orderBy: string = null, offset: number = null): Observable<CharacterResponse> {
        let url: string = `${this.baseUrl}?`;

        if (!this.challengeService.IsNullOrWhiteSpace(nameStartsWith)) {
            url += `nameStartsWith=${nameStartsWith}&`;
        }

        if (!this.challengeService.IsNullOrWhiteSpace(orderBy)) {
            url += `orderBy=${orderBy}&`;
        }

        url += `limit=${this.challengeService.maxResults.toString()}&`;

        if (offset != null) {
            url += `offset=${offset.toString()}&`;
        }

        url += this.challengeService.apiKeyHash;

        return this.http.get<CharacterResponse>(url);
    }

    getCharacter(url: string): Observable<CharacterResponse> {
        const finalurl: string = `${url}?${this.challengeService.apiKeyHash}`;

        return this.http.get<CharacterResponse>(finalurl);
    }
}
