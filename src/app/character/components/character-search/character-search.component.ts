import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { Comic } from 'src/app/comic/model/comic';
import { ChallengeService } from 'src/app/shared/services/challenge.service';

@Component({
    selector: 'amc-character-search',
    templateUrl: './character-search.component.html',
    styleUrls: ['./character-search.component.css']
})
export class CharacterSearchComponent {
    nameStartsWith: string;
    @Input() search: string;
    @Input() isBusyCharacterList: boolean = false;
    @Input() isBusyLoadingMore: boolean = false;
    @Input() favouriteComics: Comic[];

    @Output() searchByName = new EventEmitter<string>();

    constructor(private challengeService: ChallengeService) {}

    searchEqualsNameStartsWith(): boolean {
        if (this.challengeService.IsNullOrWhiteSpace(this.search)) {
            this.search = '';
        }

        if (this.challengeService.IsNullOrWhiteSpace(this.nameStartsWith)) {
            this.nameStartsWith = '';
        }

        return this.search === this.nameStartsWith;
    }

    searchCharactersByName(value: string): void {
        this.searchByName.emit(value);
    }
}
