import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../model/character';

@Component({
    selector: 'amc-character-detail',
    templateUrl: './character-detail.component.html'
})
export class CharacterDetailComponent {
    @Input() characters: Character[];
    @Input() selectedCharacter: Character;
    @Input() isBusyCharacterList: boolean;
    @Input() isBusyCharacter: boolean;

    @Output() clearCharacter = new EventEmitter<any>();

    onClearCharacter(value: any) {
        this.clearCharacter.emit(value);
    }
}
