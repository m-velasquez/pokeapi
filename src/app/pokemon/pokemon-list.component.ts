import { Component, OnInit } from "@angular/core";
import { pokemonColorMap } from './pokemonColorHash';
import { Pokemon } from '../utils/types';
import { PokemonService } from "./pokemon.service";
import { Router } from "@angular/router";


@Component({
    selector: 'pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.less']
})

export class PokemonListComponent implements OnInit {
    pokemons: Pokemon[] = [];
    private pokemonsList: Pokemon[] = [];
    search: string = '';
    offsetUI: number = +'';
    limit: number = +'';
    offset: number = this.offsetUI;

    constructor(private pokemonService: PokemonService, private router: Router) {}

    ngOnInit(): void {
        
        this.getPokemons();
        this.pokemonsList = this.pokemons;
    }   

    getPokemons() {
        this.pokemonService.getPokemonList(this.offset, this.limit)
        .subscribe((data: {results: Pokemon[]}) => this.pokemons = data.results);
    }

    gotToPokemonDetails(pokemon: Pokemon) {
        const id = this.getPokemonIdFromUrl(pokemon.url);
        this.router.navigate([`/pokedex/${id}`]);
    }

    //getPokemons() {
    //    this.pokemonService.getPokemonList(this.offset, this.limit)
    //        .then(data => this.pokemons = data)
    //}

    // async getPokemons() : Promise<void> {
    //     this.pokemons = await this.pokemonService.getPokemonList(this.offset, this.limit);
    // }

    getImageUri(pokemon: Pokemon) {
        return this.pokemonService.getPokemonImageUri(this.getPokemonIdFromUrl(pokemon.url));
    }

    getPokemonColor(pokemon: Pokemon) {
        const id = this.getPokemonIdFromUrl(pokemon.url);
        return pokemonColorMap[id];
    }

    getPokemonIdFromUrl(url: string) {
        const parseUrl = url.split('/'),
            id = parseUrl[parseUrl.length - 2];
        return +id;
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

    nextPokemons() : void {
        this.offset += this.limit;
        this.getPokemons();
    }

    searchPokemons(){
        this.pokemons = this.pokemonsList.filter(item => !item.name.indexOf(this.search));
    }

}