import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { gameResolver } from './resolver/game-resolver';

const routes: Routes = [
  {path: 'list', component: GameListComponent},
  {path: 'new', component: GameFormComponent},
  {path: 'edit/:id', component: GameFormComponent, resolve: {game: gameResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
