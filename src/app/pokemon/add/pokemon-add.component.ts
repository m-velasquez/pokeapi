import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { forbiddenNameValidator } from "../pokemon-helper";

@Component({
    selector: 'pokemon-add',
    templateUrl: './pokemon-add.component.html',
    styleUrls: []
})

export class PokemonAddComponent implements OnInit {

    profileForm = this.fb.group({
        pokemonName: [
            '', 
            [Validators.required, Validators.minLength(4)]
        ],
        pokemonDescription: [
            '', Validators.required
        ],
        address: this.fb.group({
            //street: ['', forbiddenNameValidator(/\w+/g)],
            street: [''],
            city: [''],
            state: [''],
            zip: ['']
        }),
        types: this.fb.array([
            this.fb.control('')
        ])
    })

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        
    }

    get types() {
        return this.profileForm.get('types') as FormArray
    }

    addType() {
        this.types.push(this.fb.control(''));
    }

    onSubmit() {
        console.warn(this.profileForm.value);
    }
}