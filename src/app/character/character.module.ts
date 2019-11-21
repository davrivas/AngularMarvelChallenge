import { NgModule } from '@angular/core';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterService } from './services/character.service';

@NgModule({
    declarations: [
      CharacterListComponent,
      CharacterDetailComponent
    ],
    imports: [
      /*BrowserModule,
      HttpClientModule,
      FormsModule*/
    ],
    providers: [
        CharacterService
    ]
  })
  export class CharacterModule { }
