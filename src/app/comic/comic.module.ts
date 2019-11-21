import { NgModule } from '@angular/core';
import { FavouriteComicsComponent } from './components/favourite-comics/favourite-comics.component';
import { ComicService } from './services/comic.service';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';

@NgModule({
    declarations: [
        FavouriteComicsComponent,
        ComicDetailComponent
    ],
    imports: [
        /*BrowserModule,
        HttpClientModule,
        FormsModule*/
    ],
    providers: [
        ComicService
    ]
})
export class ComicModule { }
