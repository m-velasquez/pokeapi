import { Component, OnDestroy, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { PokemonDetail, PokemonSpecies } from "src/app/utils/types";
import { pokemonTypeColorMap } from "../pokemonColorHash";
import { pokemonImageHash } from "../pokemonGameImgHash";
import { PokemonService } from "../pokemon.service";
import { isNgTemplate } from "@angular/compiler";
import { getPokemonImageUri } from "../pokemon-helper";

@Component({
    selector: 'pokemon-detail',
    templateUrl: './pokemon-detail.component.html',
    styleUrls: ['./pokemon-detail.component.less']
})

export class PokemonDetailComponent implements OnInit, OnDestroy {
    id: string = '1';
    pokemonDetail?: PokemonDetail;
    pokemonSpecies?: PokemonSpecies;
    gameDescriptions?: any; 
    language: string = 'en'

    pokemonDetailSubscription?: Subscription;
    pokemonSpeciesSubscription?: Subscription;
    
    constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private location: Location) {}

    ngOnInit(): void {
        const details = this.route.snapshot.data['details'];
        this.pokemonDetail = details[0] || {};
        this.pokemonSpecies = details[1] || {};
        this.gameDescriptions = this.filterDescriptionByLanguage(this.pokemonSpecies);
    }

    getColorByType(type: string) {
        return pokemonTypeColorMap[type]
    }

    goBack() {
        this.location.back();
    }

    getImageUri() {
        return getPokemonImageUri(+this.id);
    }

    getGameImage(name: string) {
        return pokemonImageHash[name];
    }

    getNameByLanguage(names: any[]) {
        const found = names.find((item: any) => item.language.name === this.language);

        return found?.name || 'unknown';
    }

    filterDescriptionByLanguage(species: any) {
        species.flavor_text_entries.filter((item: any) => item.language.name === this.language);
    }

    refreshDescriptions() {
        this.gameDescriptions = this.filterDescriptionByLanguage(this.pokemonSpecies);
    }

    ngOnDestroy() {
        this.pokemonDetailSubscription?.unsubscribe();
    }
}