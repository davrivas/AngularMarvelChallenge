import { Component, Input } from '@angular/core';
import { ComicService } from '../../services/comic.service';

@Component({
    selector: 'amc-favourite-comics',
    templateUrl: './favourite-comics.component.html'
})
export class FavouriteComicsComponent {
    @Input() comicService: ComicService;
}
