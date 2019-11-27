import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CharacterListComponent } from './character/components/character-list/character-list.component';
import { CharacterDetailComponent } from './character/components/character-detail/character-detail.component';
import { ComicDetailComponent } from './comic/components/comic-detail/comic-detail.component';
import { FavouriteComicsComponent } from './comic/components/favourite-comics/favourite-comics.component';
import { CharacterSearchComponent } from './character/components/character-search/character-search.component';
import { ChallengeService } from './shared/services/challenge.service';
import { CharacterService } from './character/services/character.service';
import { ComicService } from './comic/services/comic.service';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSearchComponent,
    CharacterListComponent,
    CharacterDetailComponent,
    FavouriteComicsComponent,
    ComicDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
      ChallengeService,
      CharacterService,
      ComicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
