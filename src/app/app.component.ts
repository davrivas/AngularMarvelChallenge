import { Component, OnInit } from '@angular/core';
import { Character } from './model/character';
import { CharacterService } from './services/character.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    characters: Character[];

    constructor(private characterService: CharacterService) {}

    ngOnInit(): void {
        this.characterService.getCharacters().subscribe(
            result => this.characters = result.data.results,
            error => alert('An error occured')
        );
    }
}
