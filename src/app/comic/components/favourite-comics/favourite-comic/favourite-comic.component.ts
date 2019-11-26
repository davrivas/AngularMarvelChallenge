import { Component, Input } from '@angular/core';
import { ComicService } from 'src/app/comic/services/comic.service';
import { Result as Comic } from 'src/app/comic/model/comic';

@Component({
    selector: 'amc-favourite-comic',
    templateUrl: './favourite-comic.component.html',
    styleUrls: ['./favourite-comic.component.css']
})
export class FavouriteComicComponent {
    @Input() comicService: ComicService;
    @Input() favouriteComic: Comic;
}
