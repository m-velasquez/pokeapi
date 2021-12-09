import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { PokemonListComponent } from './pokemon-list.component';

import { HttpClientModule } from '@angular/common/http';
import { PokemonDetailComponent } from './profile/pokemon-detail.component';
import { NotFoundComponent } from '../common/not-found.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonCardComponent } from './pokemon-card.component';
import { PokemonGenerationComponent } from './pokemon-generation.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    NotFoundComponent,
    PokemonDetailComponent,
    PokemonCardComponent,
    PokemonGenerationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ScrollingModule
  ],
  exports: [
    PokemonListComponent, 
    PokemonDetailComponent,
    PokemonRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class PokemonModule { }
