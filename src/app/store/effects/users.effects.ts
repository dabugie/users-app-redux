import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import * as usersActions from '../actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class UsersEffects {
    constructor(private actions$: Actions, private userService: UserService) { }

    loadUsers$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(usersActions.loadUsers),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    map((users) => usersActions.loadUsersSuccess({ users })),
                    catchError((err) => of(usersActions.loadUsersError({ payload: err })))
                )
            )
        )
    );
}
