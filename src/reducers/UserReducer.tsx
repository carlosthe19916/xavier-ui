import {
    ActionTypes
} from '../actions/UserActions';
import {
    pendingMessage,
    successMessage,
    failureMessage
} from './reducerHelper';
import { UserState } from '../models/state';
import { GenericAction } from '../models/action';

export const initialState: UserState = {
    user: null,
    fetchError: null,
    fetchStatus: 'none'
};

export const userReducer = function (
    state: UserState = initialState,
    action: GenericAction
) {
    switch (action.type) {
        case ActionTypes.UPDATE_USER: {
            const nextState: UserState = {
                ...state,
                user: Object.assign({}, state.user, action.payload.user)
            };

            return nextState;
        }

        case pendingMessage(ActionTypes.FETCH_USER): {
            const nextState: UserState = {
                ...state,
                fetchStatus: 'inProgress'
            };

            return nextState;
        }

        case successMessage(ActionTypes.FETCH_USER): {
            const nextState: UserState = {
                ...state,
                user: action.payload.data,
                fetchError: null,
                fetchStatus: 'complete'
            };

            return nextState;
        }

        case failureMessage(ActionTypes.FETCH_USER): {
            const nextState: UserState = {
                ...state,
                user: null,
                fetchError: action.payload,
                fetchStatus: 'complete'
            };

            return nextState;
        }

        default:
            return state;
    }
};
