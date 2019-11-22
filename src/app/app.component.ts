import { Component } from '@angular/core';
import { CharacterService } from './character/services/character.service';
import { ComicService } from './comic/services/comic.service';

@Component({
    selector: 'amc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    characterService: CharacterService;
    comicService: ComicService;
    readonly date: Date;

    constructor(private chs: CharacterService,
                private cos: ComicService) {
        this.characterService = chs;
        this.comicService = cos;
        this.date = new Date();
    }
}
