import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { PokemonListComponent } from './pokemon-list.component';

//material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { HttpClientModule } from '@angular/common/http';
import { PokemonDetailComponent } from './profile/pokemon-detail.component';
import { NotFoundComponent } from '../common/not-found.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonCardComponent } from './pokemon-card.component';
import { PokemonGenerationComponent } from './pokemon-generation.component';
import { MenuComponent } from '../common/menu/menu.component';
import { HeaderComponent } from '../common/header/header.component';
import { StyleManagerService } from '../common/header/style-manager.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PokemonAddComponent } from './add/pokemon-add.component';

const materialModule = [
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
]

@NgModule({
  declarations: [
    PokemonListComponent,
    NotFoundComponent,
    PokemonDetailComponent,
    PokemonCardComponent,
    PokemonGenerationComponent,
    PokemonAddComponent,
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ScrollingModule,
    ReactiveFormsModule,
    ...materialModule
  ],
  exports: [
    PokemonRoutingModule
  ],
  providers: [StyleManagerService],
  bootstrap: []
})
export class PokemonModule { }
