import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from './../../../app/store';
import * as designerActions from './../actions';
// import * as fromService f

@Injectable()
export class DesignerEffects {
    constructor(private actions$: Actions) {}

    // @Effect()
    // loadDesigner$ = this.actions$.ofType(designerActions.LOAD_DESIGNER).pipe(
    //     switchMap(() => {
    //         return 
    //     })
    // )
}
