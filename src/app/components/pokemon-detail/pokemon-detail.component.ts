import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { pokemonDetail } from 'src/app/interfaces/pokemon.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: pokemonDetail;
  screenSize: number
  constructor(private service: PokeapiService, private route: ActivatedRoute) {
    this.screenSize = window.innerWidth;
    this.pokemon = {
      name: '',
      url: '',
      category: '',
      id: 0,
      evolutions: null,
      abilities: [],
      moves: [],
      stats: [{ name: '', value: 0 }],
      types: [],
      height: 0,
      weight: 0,
    };
    this.pokemon.stats.shift();
  }

  ngOnInit(): void {
    this.route.params.subscribe((item) => {
      this.pokemon.id = item['id'];
      this.getEvolutions(this.pokemon.id);
    });
  }

  getEvolutions(id: any) {
    this.service.getPokemon(id).subscribe({
      next: (response) => {
        this.pokemon.height = response.height / 10;
        this.pokemon.weight =
          Math.round((response.weight / 10) * 2.205 * 100) / 100;
        this.pokemon.abilities = response.abilities.map(
          (item: any) => item.ability.name
        );
        this.pokemon.moves = response.moves.map((item: any) => item.move.name);
        this.pokemon.url = this.setImageUrl(response.id);
        this.pokemon.name = response.name;
        this.pokemon.stats = response.stats.map((item: any) => {
          return { name: item.stat.name, value: item.base_stat };
        });
        this.pokemon.types = response.types.map((item: any) => {
          return item.type.name;
        });
        this.service.getSpecies(response.species.url).subscribe({
          next: (res) => {
            this.pokemon.category =
              res.genera.length > 1
                ? res.genera.filter(
                    (item: any) => item.language.name === 'en'
                  )[0].genus
                : res.genera[0].genus;
            if (res.evolution_chain != null) {
              this.service
                .getEvolutionChain(res.evolution_chain.url)
                .subscribe({
                  next: (response) => {
                    this.pokemon.evolutions =
                      this.getPokemonEvolutions(response);
                    console.log(this.pokemon);
                  },
                  error: (err) => {
                    console.error(err);
                  },
                });
            } else {
              this.pokemon.evolutions = [];
            }
          },
          error: (e) => {
            console.error(e);
          },
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getPokemonEvolutions(obj: any): any[] {
    let evolutions: any[] = [];
    let chain: any = obj.chain;

    while (chain !== undefined) {
      if (Object.keys(chain).includes('species')) {
        const url = chain.species.url;
        const index = url.slice(42, url.length - 1);

        evolutions.push({
          name: chain.species.name,
          url: this.setImageUrl(index),
        });
      }
      chain = chain.evolves_to[0];
    }

    return evolutions;
  }

  private setImageUrl(id: number): string {
    let url = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';

    if (id <= 9) {
      url += '00'.concat(id.toString(), '.png');
    } else if (id <= 99) {
      url += '0'.concat(id.toString(), '.png');
    } else {
      url += id.toString() + '.png';
    }

    return url;
  }
}
