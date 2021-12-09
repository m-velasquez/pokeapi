import { Component, EventEmitter, Output , OnInit} from "@angular/core";
import { Pokemon } from "../utils/types";
import { getPokemonIdFromUrl } from "./pokemon-helper";
import { PokemonService } from "./pokemon.service";

@Component({
    selector: 'pokemon-generation',
    templateUrl: './pokemon-generation.component.html',
    styleUrls: ['./pokemon-generation.component.less']
})

export class PokemonGenerationComponent implements OnInit {
    games: {name: string, url: string}[] = [];
    generationName: string = '';
    selectedGame: string = '';
    @Output() refreshPokemons = new EventEmitter<Pokemon[]>();

    constructor (private pokemonService: PokemonService) {}

    ngOnInit() : void {
        this.pokemonService.getGeneration().subscribe((games: any) => {
            this.games = games.results;
        });
    }

    chooseGame() {
        const id = getPokemonIdFromUrl(this.selectedGame);
        this.pokemonService.getGenerationById(id)
            .subscribe((pokemons: any) => {
                this.generationName = pokemons.main_region.name;
                this.refreshPokemons.emit(pokemons.pokemons_species);
            })
    }
}