import { OnInit, Component, Input } from '@angular/core';
import { CharacterService } from '../../services/character.service';

@Component({
    selector: 'amc-character-search',
    templateUrl: './character-search.component.html'
})
export class CharacterSearchComponent {
    @Input() characterService: CharacterService;
}