import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import {Cidade} from "../../models/cidade.model";
import {CidadeService} from "../../services/cidade.service";

export const cidadeResolver: ResolveFn<Cidade> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CidadeService).findById(route.paramMap.get('id')!);
    };
