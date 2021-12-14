import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { Pokemon } from '../utils/types';
import { PokemonService } from "./pokemon.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { filter, map, pairwise, throttleTime } from "rxjs";


@Component({
    selector: 'pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.less']
})

export class PokemonListComponent implements OnInit, AfterViewInit {
    pokemons: Pokemon[] = [];
    private pokemonsList: Pokemon[] = [];
    generations: [] = [];
    search: string = '';
    offsetUI: number = +'';
    limit: number = +'';
    offset: number = this.offsetUI;
    @ViewChild('scroller') scroller?: CdkVirtualScrollViewport

    constructor(
        private pokemonService: PokemonService, 
        private router: ActivatedRoute, 
        private ngZone: NgZone) {}

    ngOnInit(): void {
        
        const pokemons = this.router.snapshot.data['pokemons']
        this.pokemons = pokemons[0].results;
        this.generations = pokemons[1].results;
        this.pokemonsList = this.pokemons;
    }
    
    displayByGeneration(pokemons: Pokemon[]) {
        this.pokemons = pokemons;
    }

    ngAfterViewInit() : void {
        this.scroller?.elementScrolled()
        .pipe(
            map(() => this.scroller?.measureScrollOffset('bottom')),
            pairwise(), //[1, 2, 3, 4] => [11, 2] [3, 4]
            filter(([y1, y2]) => {
                return (y2! < y1! && y2! < 200)
            }),
            throttleTime(200)
        ).subscribe(() => {
            this.ngZone.run(() => {
                this.getPokemons();
            })
        })
    }

    getPokemons() {
        this.offset += this.limit;
        this.pokemonService.getPokemonList(this.offset, this.limit)
        .subscribe((data: {results: Pokemon[]}) => this.pokemons = [...this.pokemons, ...data.results]);
    }
    
    nextPokemons() : void {
        this.getPokemons();
    }

    searchPokemons(){
        this.pokemons = this.pokemonsList.filter(item => !item.name.indexOf(this.search));
    }

}