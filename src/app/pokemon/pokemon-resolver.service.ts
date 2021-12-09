import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Pokemon, PokemonDetail } from "../utils/types";
import { PokemonService } from "./pokemon.service";

@Injectable({
    providedIn: "root"
})

export class PokemonResolverService implements Resolve<PokemonDetail> {
    constructor(private pokemonService: PokemonService){}

    resolve(route: ActivatedRouteSnapshot) {
        return this.pokemonService.getPokemon(route.paramMap.get('id') || '1');
    }
}