import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
//import { dataPokemons } from "./mockdata";
import { Observable, Subscriber } from "rxjs";
import { Pokemon, PokemonDetail, PokemonSpecies } from "../utils/types";

@Injectable({
    providedIn: 'root'
})

export class PokemonService{
    constructor(private http: HttpClient) {}

    getPokemon(id: string) {
        return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`) as Observable<PokemonDetail>;
    }

    getPokemonSpecies(id: string) {
        return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`) as Observable<PokemonSpecies>;
    }


    // getPokemonList(offset: number, limit: number) : Promise<Pokemon>{
    //     return new Promise((resolve, reject) => {
    //     this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    //         .subscribe((pokemon: any) => {
    //             resolve(pokemon.results);
    //         });
    //     });
    // }

    getPokemonList(offset: number = 0, limit: number = 25)  {
        return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`) as Observable<{results: Pokemon[]}>;
    }

    // getPokemonImageUri(id: number) {
    //     const imageId = ('00' + id).slice(-3); // para 1 => 001
    //     return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
    // }

    getGenerationById(id: number) {
        return this.http.get(`https://pokeapi.co/api/v2/generation/${id}`);
    }

    getGeneration() {
        return this.http.get(`https://pokeapi.co/api/v2/generation`) as Observable<{results: []}>;
    }
}