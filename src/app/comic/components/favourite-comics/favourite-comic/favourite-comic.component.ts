import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComicService } from 'src/app/comic/services/comic.service';
import { Comic } from 'src/app/comic/model/comic';

@Component({
    selector: 'amc-favourite-comic',
    templateUrl: './favourite-comic.component.html',
    styleUrls: ['./favourite-comic.component.css']
})
export class FavouriteComicComponent {
    @Input() favouriteComic: Comic;

    @Output() removeFavourite = new EventEmitter<string>();

    onRemoveFavourite(value: string) {
        this.removeFavourite.emit(value);
    }
}
