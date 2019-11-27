import { Component, OnInit } from '@angular/core';
import { Comic } from './comic/model/comic';
import { Character } from './character/model/character';
import { ChallengeService } from './shared/services/challenge.service';
import { CharacterService } from './character/services/character.service';
import { ComicService } from './comic/services/comic.service';

@Component({
    selector: 'amc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    // Character
    characters: Character[];
    selectedCharacter: Character;
    isBusyCharacterList: boolean;
    isBusyLoadingMore: boolean;
    isBusyCharacter: boolean;
    results: string;
    search: string;
    orderBy: string;
    offset: number;
    total: number;

    // Comic
    favouriteComics: Comic[];
    selectedComic: Comic;
    isBusyComic: boolean;

    readonly date: Date;

    constructor(private challengeService: ChallengeService,
                private characterService: CharacterService,
                private comicService: ComicService) {
        this.date = new Date();
    }

    ngOnInit(): void {
        this.searchCharacters(false);
    }

    // Character
    private searchCharacters(isLoadingMore: boolean) {
        if (isLoadingMore) {
            this.isBusyLoadingMore = true;
        } else {
            this.isBusyCharacterList = true;
        }

        this.offset = isLoadingMore ? this.offset : null;

        this.characterService.getCharacters(this.search, this.orderBy, this.offset).subscribe(
            result => {
                this.total = isLoadingMore ? this.total : result.data.total;
                this.characters = isLoadingMore ? this.characters.concat(result.data.results) : result.data.results;

                if (isLoadingMore) {
                    this.isBusyLoadingMore = false;
                } else {
                    this.isBusyCharacterList = false;

                    this.results = 'Results';

                    if (!this.challengeService.IsNullOrWhiteSpace(this.search)) {
                        this.results += ` for <strong>'${this.search}'</strong>`;
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

    onSearchCharactersByName(value: string): void {
        this.characters = null;

        if (!this.challengeService.IsNullOrWhiteSpace(value)) {
            this.search = value;
        } else {
            this.search = null;
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

        if (this.challengeService.IsNullOrWhiteSpace(this.search)) {
            this.search = null;
        }

        if (this.offset === null || this.offset === undefined) {
            this.offset = null;
        }

        this.searchCharacters(false);
    }

    onLoadMoreCharacters(value: number) {
        this.offset = value;
        this.searchCharacters(true);
    }

    selectCharacter(url: string): void {
        if (this.selectedCharacter !== null || this.selectedCharacter !== undefined) {
            this.onClearCharacter(null);
        }

        this.isBusyCharacter = true;
        this.characterService.getCharacter(url).subscribe(
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

    onClearCharacter(value: any): void {
        this.selectedCharacter = null;
    }

    // Comic
    selectComic(url: string): void {
        if (this.selectedComic !== null || this.selectedComic !== undefined) {
            this.onClearComic(null);
        }

        this.isBusyComic = true;
        this.comicService.getComic(url).subscribe(
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

    onClearComic(value: any): void {
        this.selectedComic = null;
    }

    onRemoveFavourite(id: number): void {
        this.favouriteComics = this.favouriteComics.filter(x => x.id !== id);
    }
}
