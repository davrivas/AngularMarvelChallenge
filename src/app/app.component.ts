import { Component, OnInit, Input } from '@angular/core';
import { Result as Character } from './model/character';
import { CharacterService } from './services/character.service';
import { Result as Comic } from './model/comic';
import { ComicService } from './services/comic.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    characters: Character[];
    selectedCharacter: Character;
    selectedComic: Comic;

    @Input() search: string;

    constructor(private characterService: CharacterService, private comicService: ComicService) {}

    ngOnInit(): void {
        this.characterService.getCharacters().subscribe(
            result => this.characters = result.data.results,
            error => alert('An error occured')
        );
    }

    searchCharacter(): void {
        console.log(this.search);
    }

    selectCharacter(url: string): void {
        this.characterService.getCharacter(url).subscribe(
            result => this.selectedCharacter = result.data.results[0],
            error => alert('An error occured')
        );
    }

    selectComic(url: string): void {
        this.comicService.getComic(url).subscribe(
            result => this.selectedComic = result.data.results[0],
            error => alert('An error occured')
        );
    }
}
