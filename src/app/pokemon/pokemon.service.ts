import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
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

    getPokemonList(offset: number = 0, limit: number = 25)  {
        return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`) as Observable<{results: Pokemon[]}>;
    }

    getGenerationById(id: string) {
        return this.http.get(`https://pokeapi.co/api/v2/generation/${id}`);
    }

    getGeneration() {
        return this.http.get(`https://pokeapi.co/api/v2/generation`) as Observable<{results: []}>;
    }
}