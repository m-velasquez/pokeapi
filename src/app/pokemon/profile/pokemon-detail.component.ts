import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { PokemonDetail } from "src/app/utils/types";
import { pokemonTypeColorMap } from "../pokemonColorHash";
import { pokemonImageHash } from "../pokemonGameImgHash";
import { PokemonService } from "../pokemon.service";
import { isNgTemplate } from "@angular/compiler";

@Component({
    selector: 'pokemon-detail',
    templateUrl: './pokemon-detail.component.html',
    styleUrls: ['./pokemon-detail.component.less']
})

export class PokemonDetailComponent {
    id: string = '1';
    pokemonDetail?: PokemonDetail;
    pokemonSpecies?: any;
    gameDescriptions?: any; 
    language: string = 'en'

    pokemonDetailSubscription?: Subscription;
    pokemonSpeciesSubscription?: Subscription;
    
    constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private location: Location) {}

    ngOnInit(): void {
        this.pokemonDetail = this.route.snapshot.data['pokemon'];

        // this.id = this.route.snapshot.paramMap.get('id') || '1';
        // this.pokemonDetailSubscription = this.pokemonService.getPokemon(this.id).subscribe(pokemonDetail => {

        //     this.pokemonDetail = pokemonDetail
        // //console.log(this.pokemonDetail);
        // });

        this.pokemonSpeciesSubscription = this.pokemonService.getPokemonSpecies(this.id).subscribe((pokemonSpecies: any) => {
            this.pokemonSpecies = pokemonSpecies;
            this.gameDescriptions = this.filterDescriptionByLanguage(pokemonSpecies);
            //console.log(this.pokemonSpecies);
        });
    }

    getColorByType(type: string) {
        return pokemonTypeColorMap[type]
    }

    goBack() {
        this.location.back();
    }

    getImageUri() {
        return this.pokemonService.getPokemonImageUri(+this.id);
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