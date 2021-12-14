export function getPokemonIdFromUrl(url: string) {
    const parseUrl = url.split('/'),
        id = parseUrl[parseUrl.length - 2];
    return +id;
}

export function getPokemonImageUri(id: number) {
    const imageId = ('00' + id).slice(-3); // para 1 => 001
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
}