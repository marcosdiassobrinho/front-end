import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Game } from "src/app/models/game.model";
import { GameService } from "src/app/services/game.service";

export const gameResolver: ResolveFn<Game> = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(GameService).findById(route.paramMap.get('id')!);
    };