import { OnInit, Component, Input } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { ComicService } from 'src/app/comic/services/comic.service';

@Component({
    selector: 'amc-character-list',
    templateUrl: './character-list.component.html'
})
export class CharacterListComponent implements OnInit {
    @Input() characterService: CharacterService;
    @Input() comicService: ComicService;

    ngOnInit(): void {
        this.characterService.searchCharacters(false);
        // this.characterService.isBusyCharacterList = true;
    }
}
