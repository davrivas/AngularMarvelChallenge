import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../model/character';
import { ChallengeService } from 'src/app/shared/services/challenge.service';

@Component({
    selector: 'amc-character-list',
    templateUrl: './character-list.component.html'
})
export class CharacterListComponent {
    @Input() characters: Character[];
    @Input() isBusyCharacterList: boolean;
    @Input() isBusyLoadingMore: boolean;
    @Input() results: string;
    @Input() total: number;
    @Input() maxResults: number;

    @Output() orderByChange = new EventEmitter<string>();
    @Output() loadMoreCharacters = new EventEmitter<number>();

    @Output() selectCharacter = new EventEmitter<string>();
    @Output() selectComic = new EventEmitter<string>();

    constructor(private challengeService: ChallengeService) {}

    onOrderByChange(value: string) {
        this.orderByChange.emit(value);
    }

    onLoadMoreCharacters(value: number): void {
        value = (this.characters.length * this.total) / this.total;
        this.loadMoreCharacters.emit(value);
    }

    hasMoreCharacters(): boolean {
        return this.characters.length <= this.total - 1;
    }

    hasReachedTheEnd(): boolean {
        return this.total > this.challengeService.maxResults && !this.hasMoreCharacters();
    }

    onSelectCharacter(value: string) {
        this.selectCharacter.emit(value);
    }

    onSelectComic(value: string) {
        this.selectComic.emit(value);
    }
}
