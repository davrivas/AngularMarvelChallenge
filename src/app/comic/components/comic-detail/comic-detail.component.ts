import { Component, Input } from '@angular/core';
import { ComicService } from '../../services/comic.service';
import { CharacterService } from 'src/app/character/services/character.service';

@Component({
    selector: 'amc-comic-detail',
    templateUrl: './comic-detail.component.html',
    styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent {
    @Input() comicService: ComicService;
    @Input() characterService: CharacterService;
}
