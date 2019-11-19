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

    nameStartsWith: string;
    orderBy: string;
    offset: number;

    constructor(private challengeService: ChallengeService,
                private characterService: CharacterService,
                private comicService: ComicService) { }

    ngOnInit(): void {
        this.characterService.getCharacters().subscribe(
            result => this.characters = result.data.results,
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

        this.characterService.getCharacters(this.nameStartsWith, this.orderBy, this.offset).subscribe(
            result => this.characters = result.data.results,
            error => alert('An error occured')
        );
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

        this.characterService.getCharacters(this.nameStartsWith, this.orderBy, this.offset).subscribe(
            result => this.characters = result.data.results,
            error => alert('An error occured')
        );
    }

    selectCharacter(url: string): void {
        if (this.selectedCharacter !== null) {
            this.clearCharacter();
        }

        this.characterService.getCharacter(url).subscribe(
            result => this.selectedCharacter = result.data.results[0],
            error => alert('An error occured')
        );
    }

    clearCharacter(): void {
        this.selectedCharacter = null;
    }

    selectComic(url: string): void {
        if (this.selectedComic !== null) {
            this.clearComic();
        }

        this.comicService.getComic(url).subscribe(
            result => this.selectedComic = result.data.results[0],
            error => alert('An error occured')
        );
    }

    clearComic(): void {
        this.selectedComic = null;
    }

    isFavourite(id: number): boolean {
        if (this.favouriteComics === null || this.favouriteComics === undefined) {
            return false;
        }

        return this.favouriteComics.some(x => x.id === id);
    }

    addFavourite(comic: Comic): void {
        if (this.favouriteComics === undefined || this.favouriteComics === null || this.favouriteComics.length === 0) {
            this.favouriteComics = [comic];
        } else {
            this.favouriteComics.push(comic);
        }
    }

    removeFavourite(id: number): void {
        this.favouriteComics = this.favouriteComics.filter(x => x.id !== id);
    }
}
