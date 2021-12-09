import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Pokemon } from "src/app/utils/types";
import { getPokemonIdFromUrl } from "./pokemon-helper";
import { PokemonService } from "./pokemon.service";
import { pokemonColorMap } from "./pokemonColorHash";

@Component({
    selector: 'pokemon-card',
    templateUrl: './pokemon-card.component.html',
    styleUrls: ['./pokemon-card.component.less']
})

export class PokemonCardComponent implements OnInit {
    @Input() pokemon!: Pokemon;

    constructor(private pokemonService: PokemonService, private router: Router) {}

    ngOnInit(): void {

    }

    getImageUri(pokemon: Pokemon) {
        return this.pokemonService.getPokemonImageUri(getPokemonIdFromUrl(pokemon.url));
    }

    getPokemonColor(pokemon: Pokemon) {
        const id = getPokemonIdFromUrl(pokemon.url);
        return pokemonColorMap[id];
    }

    getTextColor(pokemon: Pokemon) {
        const pokemonColor = this.getPokemonColor(pokemon);

        switch(pokemonColor) {
            case '#fbf6f6':
            case '#f0f060e6':
                return 'black';
            default:
                return 'white';
        }
    }

    gotToPokemonDetails(pokemon: Pokemon) {
        const id = getPokemonIdFromUrl(pokemon.url);
        this.router.navigate([`/pokedex/${id}`]);
    }
}