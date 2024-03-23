export interface PokemonModel {
    name: string;
    url: string;
}
export interface PokemonStat {
    base_stat: number;
    name: string;
}
export interface PokemonModelInfo extends PokemonModel {
    height: number, 
    weight: number,
    types: string[],
    abilities: string[],
    stats: PokemonStat[],
    exp: string,
    id: string
}

export interface PokemonModelCard {
    name: string,
    url:string,
    types: string[],
    exp: string,
    id: string
}

export interface PokemonTypes {
    icon: string,
    number: number,
}