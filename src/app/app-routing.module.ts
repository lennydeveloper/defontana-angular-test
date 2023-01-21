import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonHomeComponent } from './components/pokemon-home/pokemon-home.component';

const routes: Routes = [
  { path: 'pokemon', component: PokemonHomeComponent },
  { path: 'pokemon/detail/:id', component: PokemonDetailComponent, pathMatch: 'full' },
  { path: '', pathMatch: 'full', redirectTo: 'pokemon' },
  { path: '**', pathMatch: 'full', redirectTo: 'pokemon' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
