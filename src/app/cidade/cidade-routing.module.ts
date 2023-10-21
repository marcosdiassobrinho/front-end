import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CidadeComponent} from './components/cidade/cidade.component';

const routes: Routes = [
    {path: '', component: CidadeComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CidadeRoutingModule {
}
