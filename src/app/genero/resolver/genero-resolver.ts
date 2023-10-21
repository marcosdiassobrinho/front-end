import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Genero } from "src/app/models/genero.model";
import { GeneroService } from "src/app/services/genero.service";

export const generoResolver: ResolveFn<Genero> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    return inject(GeneroService).findById(route.paramMap.get('id')!)
  }
