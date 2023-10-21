import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'estados', loadChildren:
            () => import('./estado/estado.module')
                .then(m => m.EstadoModule)
    },

    {
        path: 'cidades', loadChildren:
            () => import('./cidade/cidade.module')
                .then(m => m.CidadeModule)
    },
    {
        path: 'fabricantes', loadChildren:
            () => import('./fabricante/fabricante.module')
                .then(m => m.FabricanteModule)
    },
    {
        path: 'plataformas', loadChildren:
            () => import('./plataformas/plataforma.module')
                .then(m => m.PlataformaModule)
    },
    {
        path: 'games', loadChildren:
            () => import('./game/game.module')
                .then(m => m.GameModule)
    },
    {
        path: 'developers', loadChildren:
            () => import('./developer/developer.module')
                .then(m => m.DeveloperModule)
    },
    {
        path: 'generos', loadChildren:
            () => import('./genero/genero.module')
                .then(m => m.GeneroModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
