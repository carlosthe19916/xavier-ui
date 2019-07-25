import {
    ActionTypes
} from '../actions/ReportActions';
import {
    pendingMessage,
    successMessage,
    failureMessage
} from './reducerHelper';
import { ReportListState } from '../models/state';
import { GenericAction } from '../models/action';

export const initialState: ReportListState = {
    total: 0,
    items: [],
    fetchError: null,
    fetchStatus: 'none'
};

export const reportListReducer = function (
    state: ReportListState = initialState,
    action: GenericAction
) {
    switch (action.type) {
        case pendingMessage(ActionTypes.FETCH_REPORTS): {
            const nextState: ReportListState = {
                ...state,
                fetchStatus: 'inProgress'
            };
            return nextState;
        }

        case successMessage(ActionTypes.FETCH_REPORTS): {
            const nextState: ReportListState = {
                ...state,
                items: action.payload.data.content,
                total: action.payload.data.totalElements,
                fetchError: null,
                fetchStatus: 'complete'
            };
            return nextState;
        }

        case failureMessage(ActionTypes.FETCH_REPORTS): {
            const nextState: ReportListState = {
                ...state,
                items: [],
                total: 0,
                fetchError: action.payload,
                fetchStatus: 'complete'
            };
            return nextState;
        }

        // DELETE_REPORT single report
        case successMessage(ActionTypes.DELETE_REPORT): {
            const nextState: ReportListState = {
                ...state,
                total: state.total - 1,
                items: state.items.filter(r => r.id !== action.payload.id)
            };
            return nextState;
        }

        default:
            return state;
    }
};
