import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import {PageEvent} from '@angular/material/paginator';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

export interface Ipokemon {
  name: string,
  url: string,
  image: string,
  types: any[],
  id: string
}

@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.scss']
})
export class PokemonGridComponent implements OnInit, OnDestroy {
  pokemonData: Ipokemon[] = []
  pokemonDataFiltered: Ipokemon[] = []
  start: number = 0
  size: number = 10
  disabled: boolean = false
  pageIndex: number = 0
  pageSizeOptions = [10, 25, 100];
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private service: PokeapiService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    if (window.innerWidth > 735) {
      this.size = 25
      this.pokemonDataFiltered = this.pokemonData.slice(0, this.size)
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.service.getAllPokemons().subscribe({
      next: (res) => {
        const data = res.results
        this.pokemonData = data.map((item: any, index: number) => {
          const id = item.url.slice(34, item.url.length - 1)
          item.image = this.setImageUrl(index)
          item.id = this.getPokemonId(index)

          this.service.getPokemon(id).subscribe({
            next: (res) => {
              item.types = res.types.map((pokemon: any) => pokemon.type.name)
            },
            error: (err) => {
              console.error(err)
            }
          })

          return item
        })
        this.pokemonDataFiltered = this.pokemonData
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.size = e.pageSize;
    const start = e.pageIndex * e.pageSize;
    this.pokemonDataFiltered = this.pokemonData.slice(start, e.pageSize + start)
  }

  showPokemonDetail(pokemon: Ipokemon) {
    const url = pokemon.url.slice(0, pokemon.url.length - 1)
    const index = pokemon.url.slice(url.lastIndexOf('/') + 1, url.length)

    this.router.navigateByUrl('/pokemon/detail/' + index)
  }

  private setImageUrl(id: number): string {
    let url = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
    const index = (id + 1).toString();

    if (id < 9) {
      url += '00'.concat(index, '.png')
    } else if (id < 99) {
      url += '0'.concat(index, '.png')
    } else {
      url += index + '.png'
    }

    return url;
  }

  private getPokemonId (id: number): string {
    const index = (id + 1).toString();

    if (id < 9) {
      return '000'.concat(index)
    } else if (id < 99) {
      return '00'.concat(index)
    }

    return '0'.concat(index)
  }
}
