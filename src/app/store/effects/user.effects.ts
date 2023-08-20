import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import * as userActions from '../actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userService: UserService) { }

    loadUser$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(userActions.loadUser),
            mergeMap((action) =>
                this.userService.getUserById(action.id).pipe(
                    map((user) => userActions.loadUserSuccess({ user })),
                    catchError((err) => of(userActions.loadUserError({ payload: err })))
                )
            )
        )
    );
}
