import { AbstractControl, ControlContainer, ValidationErrors, ValidatorFn } from "@angular/forms";

export function getPokemonIdFromUrl(url: string) {
    const parseUrl = url.split('/'),
        id = parseUrl[parseUrl.length - 2];
    return id;
}

export function getPokemonImageUri(id: string) {
    //const id1: number = +id;
    const imageId = ('00' + id).slice(-3); // para 1 => 001
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
}

export function forbiddenNameValidator(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const forbidden = regex.test(control.value);
        return forbidden ? {forbiddenName: {value: control.value}} : null;    
    }
}