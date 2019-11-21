import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChallengeService } from '../../shared/services/challenge.service';
import { ComicResponse } from '../../model/comic';

@Injectable({
    providedIn: 'root'
})
export class ComicService {
    constructor(private http: HttpClient, private challengeService: ChallengeService) {}

    getComic(url: string): Observable<ComicResponse> {
        const finalUrl = `${url}?${this.challengeService.apiKeyHash}`;
        return this.http.get<ComicResponse>(finalUrl);
    }
}
