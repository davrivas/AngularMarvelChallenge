import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CharacterModule } from './character/character.module';
import { ComicModule } from './comic/comic.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CharacterModule,
    ComicModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
