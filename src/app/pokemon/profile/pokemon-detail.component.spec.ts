import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { PokemonDetail } from "src/app/utils/types";
import { PokemonDetailComponent } from "./pokemon-detail.component";

const bulbasaur: PokemonDetail = {
    "abilities": [],
    "base_experience": 64,
    "forms": [],
    "game_indices": [],
    "height": 7,
    "held_items": [],
    "id": 1,
    "is_default": true,
    "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/1/encounters",
    "moves": [],
    "name": "bulbasaur",
    "order": 1,
    "past_types": [],
    "species": {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
    },
    "types": [
        {
            "slot": 1,
            "type": {
                "name": "grass",
                "url": "https://pokeapi.co/api/v2/type/12/"
            }
        },
        {
            "slot": 2,
            "type": {
                "name": "poison",
                "url": "https://pokeapi.co/api/v2/type/4/"
            }
        }
    ],
    "weight": 69
  };
  

let MockPokemonRouter = {
    snapshot: {
        data: {
            'details': [{...bulbasaur}, {}]
        }
    }
}

describe('Pokemon card test', () => {
    let component: PokemonDetailComponent,
    fixture: ComponentFixture<PokemonDetailComponent>,
    router: ActivatedRoute,
    location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PokemonDetailComponent],
            providers: [
                {provide: ActivatedRoute, useValue: MockPokemonRouter}
            ]
        })
        fixture = TestBed.createComponent(PokemonDetailComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(ActivatedRoute)
        location = TestBed.inject(Location)
    });

    it('should create', () => {
        expect(component).toBeDefined();
    })

    it('should get color green for type grass', () => {
        const color = component.getColorByType('grass');
        expect(color).toEqual('#7AC74C');
    })
});