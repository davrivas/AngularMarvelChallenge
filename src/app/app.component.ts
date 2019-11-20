import { Component, OnInit } from '@angular/core';
import { Result as Character } from './model/character';
import { CharacterService } from './services/character.service';
import { Result as Comic } from './model/comic';
import { ComicService } from './services/comic.service';
import { ChallengeService } from './services/challenge.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    characters: Character[];
    favouriteComics: Comic[];
    selectedCharacter: Character;
    selectedComic: Comic;

    readonly date: Date;

    isBusyCharacterList: boolean;
    isBusyCharacter: boolean;
    isBusyComic: boolean;

    nameStartsWith: string;
    orderBy: string;
    offset: number;
    total: number;

    constructor(private challengeService: ChallengeService, private characterService: CharacterService,
                private comicService: ComicService) {
        this.isBusyCharacterList = false;
        this.isBusyCharacter = false;
        this.isBusyComic = false;
        this.date = new Date();
    }

    ngOnInit(): void {
        this.getCharacters(false);
    }

    private getCharacters(isLoadingMore: boolean) {
        this.offset = isLoadingMore ? this.offset : null;

        this.characterService.getCharacters(this.nameStartsWith, this.orderBy, this.offset).subscribe(
            result => {
                this.isBusyCharacterList = false;
                this.total = isLoadingMore ? this.total : result.data.total;
                this.characters = isLoadingMore ? this.characters.concat(result.data.results) : result.data.results;
                this.isBusyCharacterList = false;
            },
            error => alert('An error occured')
        );
    }

    searchCharacter(): void {
        this.characters = null;

        if (this.challengeService.IsNullOrWhiteSpace(this.orderBy)) {
            this.orderBy = null;
        }

        if (this.offset === null || this.offset === undefined) {
            this.offset = null;
        }

        this.getCharacters(false);
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

        this.getCharacters(false);
    }

    hasMoreCharacters(): boolean {
        return this.characters && this.characters.length <= this.total;
    }

    loadMore(): void {
        this.offset = (this.characters.length * this.total) / this.total;
        this.getCharacters(true);
    }

    selectCharacter(url: string): void {
        if (this.selectedCharacter !== null || this.selectedCharacter !== undefined) {
            this.clearCharacter();
        }

        this.characterService.getCharacter(url).subscribe(
            result => {
                this.isBusyCharacter = true;
                this.selectedCharacter = result.data.results[0];
                this.isBusyCharacter = false;
            },
            error => alert('An error occured')
        );
    }

    clearCharacter(): void {
        this.selectedCharacter = null;
    }

    selectComic(url: string): void {
        if (this.selectedComic !== null || this.selectedComic !== undefined) {
            this.clearComic();
        }

        this.comicService.getComic(url).subscribe(
            result => {
                this.isBusyComic = true;
                this.selectedComic = result.data.results[0];
                this.isBusyComic = false;
            },
            error => alert('An error occured')
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
}
