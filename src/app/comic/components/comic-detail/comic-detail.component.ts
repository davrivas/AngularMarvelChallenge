import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChallengeService } from 'src/app/shared/services/challenge.service';
import { Comic } from '../../model/comic';
import { Character } from 'src/app/character/model/character';

@Component({
    selector: 'amc-comic-detail',
    templateUrl: './comic-detail.component.html',
    styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent {
    @Input() characters: Character[];
    @Input() favouriteComics: Comic[];
    @Input() selectedComic: Comic;
    @Input() isBusyCharacterList: boolean;
    @Input() isBusyComic: boolean;

    @Output() addFavourite = new EventEmitter<Comic>();
    @Output() removeFavourite = new EventEmitter<number>();
    @Output() clearComic = new EventEmitter<any>();

    constructor(private challengeService: ChallengeService) {}

    // check this
    isFavourite(id: number): boolean {
        if (this.challengeService.IsNullOrEmpty(this.favouriteComics)) {
            return false;
        }

        return this.favouriteComics.some(x => x.id === id);
    }

    onAddFavourite(value: Comic) {
        this.addFavourite.emit(value);
    }

    onRemoveFavourite(value: number) {
        this.removeFavourite.emit(value);
    }

    onClearComic(value: any) {
        this.clearComic.emit(value);
    }
}
