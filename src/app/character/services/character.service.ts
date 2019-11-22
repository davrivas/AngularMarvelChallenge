import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterResponse, Result as Character } from '../../model/character';
import { ChallengeService } from '../../shared/services/challenge.service';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    characters: Character[];
    selectedCharacter: Character;

    isBusyCharacterList: boolean;
    isBusyLoadingMore: boolean;
    isBusyCharacter: boolean;
    results: string;

    search: string;
    nameStartsWith: string;
    orderBy: string;
    offset: number;
    total: number;

    private readonly baseUrl: string = 'https://gateway.marvel.com/v1/public/characters';

    constructor(private http: HttpClient, private challengeService: ChallengeService) { }

    searchCharacters(isLoadingMore: boolean) {
        if (isLoadingMore) {
            this.isBusyLoadingMore = true;
        } else {
            this.isBusyCharacterList = true;
        }

        this.offset = isLoadingMore ? this.offset : null;

        this.getCharacters(this.nameStartsWith, this.orderBy, this.offset).subscribe(
            result => {
                this.total = isLoadingMore ? this.total : result.data.total;
                this.characters = isLoadingMore ? this.characters.concat(result.data.results) : result.data.results;

                if (isLoadingMore) {
                    this.isBusyLoadingMore = false;
                } else {
                    this.isBusyCharacterList = false;

                    this.results = 'Results';

                    if (!this.challengeService.IsNullOrWhiteSpace(this.nameStartsWith)) {
                        this.results += ` for <strong>'${this.nameStartsWith}'</strong>`;
                    }

                    this.results += `: ${this.total}`;
                }
            },
            error => {
                alert('An error occured');
                if (isLoadingMore) {
                    this.isBusyLoadingMore = false;
                } else {
                    this.isBusyCharacterList = false;
                }
            }
        );
    }

    searchCharactersByName(): void {
        this.characters = null;

        if (!this.challengeService.IsNullOrWhiteSpace(this.search)) {
            this.nameStartsWith = this.search;
        } else {
            this.nameStartsWith = null;
        }

        if (this.challengeService.IsNullOrWhiteSpace(this.orderBy)) {
            this.orderBy = null;
        }

        if (this.offset === null || this.offset === undefined) {
            this.offset = null;
        }

        this.searchCharacters(false);
    }

    onOrderByChange(value: string): void {
        this.characters = null;
        this.orderBy = value;

        if (this.challengeService.IsNullOrWhiteSpace(this.nameStartsWith)) {
            this.nameStartsWith = null;
        }

        if (this.offset === null || this.offset === undefined) {
            this.offset = null;
        }

        this.searchCharacters(false);
    }

    selectCharacter(url: string): void {
        if (this.selectedCharacter !== null || this.selectedCharacter !== undefined) {
            this.clearCharacter();
        }

        this.isBusyCharacter = true;
        this.getCharacter(url).subscribe(
            result => {
                this.selectedCharacter = result.data.results[0];
                this.isBusyCharacter = false;
            },
            error => {
                alert('An error occured');
                this.isBusyCharacter = false;
            }
        );
    }

    hasMoreCharacters(): boolean {
        return this.characters.length <= this.total - 1;
    }

    loadMoreCharacters(): void {
        this.offset = (this.characters.length * this.total) / this.total;
        this.searchCharacters(true);
    }

    clearCharacter(): void {
        this.selectedCharacter = null;
    }

    private getCharacters(nameStartsWith: string = null, orderBy: string = null, offset: number = null): Observable<CharacterResponse> {
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

    private getCharacter(url: string): Observable<CharacterResponse> {
        const finalurl: string = `${url}?${this.challengeService.apiKeyHash}`;

        return this.http.get<CharacterResponse>(finalurl);
    }
}
