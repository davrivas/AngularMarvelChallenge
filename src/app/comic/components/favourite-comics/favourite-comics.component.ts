import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comic } from '../../model/comic';

@Component({
    selector: 'amc-favourite-comics',
    templateUrl: './favourite-comics.component.html',
    styleUrls: ['./favourite-comics.component.css']
})
export class FavouriteComicsComponent {
    @Input() favouriteComics: Comic[];

    @Output() clearComic = new EventEmitter<any>();
    @Output() removeFavourite = new EventEmitter<number>();

    onClearComic(value: any) {
        this.clearComic.emit(value);
    }

    onRemoveFavourite(value: number) {
        this.removeFavourite.emit(value);
    }
}
