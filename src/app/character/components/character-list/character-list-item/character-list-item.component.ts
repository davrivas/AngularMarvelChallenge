import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from 'src/app/character/model/character';

@Component({
    selector: 'amc-character-list-item',
    templateUrl: './character-list-item.component.html',
    styleUrls: ['./character-list-item.component.css']
})
export class CharacterListItemComponent {
    @Input() character: Character;

    @Output() selectCharacter = new EventEmitter<string>();
    @Output() selectComic = new EventEmitter<string>();

    onSelectCharacter(value: string) {
        this.selectCharacter.emit(value);
    }

    onSelectComic(value: string) {
        this.selectComic.emit(value);
    }
}
