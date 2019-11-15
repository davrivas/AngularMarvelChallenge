import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChallengeService } from './challenge.service';

@Injectable({
    providedIn: 'root'
})
export class ComicService {
    constructor(private http: HttpClient, private challengeService: ChallengeService) {}

    getComics(url: string): Observable<any> {
        return this.http.get<any>(url);
    }
}
