import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  url = environment.pokeapiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllPokemons() {
    return this.http.get<any>(`${this.url}/pokemon/?limit=1008`)
  }

  getPokemon(id: number | string) {
    return this.http.get<any>(`${this.url}/pokemon/${id}`)
  }

  getSpecies(url: string) {
    return this.http.get<any>(url)
  }

  getEvolutionChain(url: string) {
    return this.http.get<any>(url)
  }
}
