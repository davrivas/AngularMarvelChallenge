import { Component, Input } from '@angular/core';
import { CharacterService } from '../../services/character.service';

@Component({
    selector: 'amc-character-detail',
    templateUrl: './character-detail.component.html'
})
export class CharacterDetailComponent {
    @Input() characterService: CharacterService;
}
