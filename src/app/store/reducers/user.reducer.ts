import { createReducer, on } from '@ngrx/store';
import { loadUser, loadUserError, loadUserSuccess } from '../actions';
import { User } from 'src/app/models/user.model';

export interface UserState {
    id: string;
    user: User | null;
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const userInitialState: UserState = {
    id: '',
    user: null,
    loaded: false,
    loading: false,
    error: null,
};

export const userReducer = createReducer(
    userInitialState,

    on(loadUser, (state, { id }) => ({ ...state, loading: true, id: id })),

    on(loadUserSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        loaded: true,
        user: { ...user },
        error: null,
    })),

    on(loadUserError, (state, { payload }) => ({
        ...state,
        user: null,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message,
        },
    }))
);
