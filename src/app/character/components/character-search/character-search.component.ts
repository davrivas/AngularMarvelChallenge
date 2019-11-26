import { OnInit, Component, Input } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { ComicService } from 'src/app/comic/services/comic.service';

@Component({
    selector: 'amc-character-search',
    templateUrl: './character-search.component.html',
    styleUrls: ['./character-search.component.css']
})
export class CharacterSearchComponent {
    @Input() characterService: CharacterService;
    @Input() comicService: ComicService;
}
