export function getPokemonIdFromUrl(url: string) {
    const parseUrl = url.split('/'),
        id = parseUrl[parseUrl.length - 2];
    return +id;
}