import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootObject } from '../model/character';
import { ChallengeService } from './challenge.service';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    private readonly baseUrl: string = 'http://gateway.marvel.com/v1/public/characters';

    constructor(private http: HttpClient) {}

    getCharacters(): Observable<RootObject> {
        const url = `${this.baseUrl}?apiKey=${ChallengeService.publicKey}&ts=1&hash=${ChallengeService.getHash()}`;
        return this.http.get<RootObject>(url);
    }
}
