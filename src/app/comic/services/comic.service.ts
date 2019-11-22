import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChallengeService } from '../../shared/services/challenge.service';
import { ComicResponse, Result as Comic } from '../../model/comic';

@Injectable({
    providedIn: 'root'
})
export class ComicService {
    favouriteComics: Comic[];
    selectedComic: Comic;
    isBusyComic: boolean;

    constructor(private http: HttpClient, private challengeService: ChallengeService) {}

    selectComic(url: string): void {
        if (this.selectedComic !== null || this.selectedComic !== undefined) {
            this.clearComic();
        }

        this.isBusyComic = true;
        this.getComic(url).subscribe(
            result => {
                this.selectedComic = result.data.results[0];
                this.isBusyComic = false;
            },
            error => {
                alert('An error occured');
                this.isBusyComic = false;
            }
        );
    }

    clearComic(): void {
        this.selectedComic = null;
    }

    isFavourite(id: number): boolean {
        if (this.favouriteComics === null || this.favouriteComics === undefined) {
            return false;
        } else if (this.favouriteComics.length === 0) {
            return false;
        }

        return this.favouriteComics.some(x => x.id === id);
    }

    addFavourite(comic: Comic): void {
        if (this.favouriteComics === undefined || this.favouriteComics === null) {
            this.favouriteComics = [comic];
        } else if (this.favouriteComics.length === 0) {
            this.favouriteComics = [comic];
        } else {
            this.favouriteComics.push(comic);
        }
    }

    removeFavourite(id: number): void {
        this.favouriteComics = this.favouriteComics.filter(x => x.id !== id);
    }

    private getComic(url: string): Observable<ComicResponse> {
        const finalUrl = `${url}?${this.challengeService.apiKeyHash}`;
        return this.http.get<ComicResponse>(finalUrl);
    }
}
