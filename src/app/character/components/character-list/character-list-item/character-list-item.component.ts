import { OnInit, Component, Input } from '@angular/core';
import { CharacterService } from 'src/app/character/services/character.service';
import { ComicService } from 'src/app/comic/services/comic.service';
import { Character } from 'src/app/character/model/character';

@Component({
    selector: 'amc-character-list-item',
    templateUrl: './character-list-item.component.html',
    styleUrls: ['./character-list-item.component.css']
})
export class CharacterListItemComponent {
    @Input() characterService: CharacterService;
    @Input() comicService: ComicService;
    @Input() character: Character;
}
