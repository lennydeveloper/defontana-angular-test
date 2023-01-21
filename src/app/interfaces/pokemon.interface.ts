export interface pokemonDetail {
  name: string,
  url: string,
  id: number,
  category: string,
  moves: string[],
  stats: [{ name: string, value: number }],
  types: string[],
  evolutions: any[] | null,
  abilities: string[],
  height: number,
  weight: number,
}
