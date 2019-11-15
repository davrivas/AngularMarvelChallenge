import { Component, OnInit } from '@angular/core';
import { Result as CharacterList } from './model/character-list';
import { Result as Character } from './model/character';
import { CharacterService } from './services/character.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    characters: CharacterList[];
    selectedCharacter: Character;
    selectedComic: any;

    constructor(private characterService: CharacterService) {}

    ngOnInit(): void {
        this.characterService.getCharacters().subscribe(
            result => this.characters = result.data.results,
            error => alert('An error occured')
        );
    }

    selectComic(url: string): void {
        this.characterService.getCharacter(url).subscribe(
            result => this.selectedCharacter = result.data.results[0],
            error => alert('An error occured')
        );
    }

    selectCharacter(url: string): void {
        console.log(url);
    }
}
