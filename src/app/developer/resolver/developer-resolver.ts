import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Developer } from "src/app/models/developer.model";
import { DeveloperService } from "src/app/services/developer.service";

export const developerResolver: ResolveFn<Developer> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(DeveloperService).findById(route.paramMap.get('id')!);
    };

