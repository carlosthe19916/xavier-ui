import {
    ActionTypes
} from '../actions/ReportActions';
import {
    pendingMessage,
    successMessage,
    failureMessage
} from './reducerHelper';
import { InitialSavingEstimationState } from '../models/state';
import { GenericAction } from '../models/action';

export const initialState: InitialSavingEstimationState = {
    byId: new Map(),
    fetchStatus: new Map,
    errors: new Map()
};

export const initialSavingEstimationReducer = function (
    state: InitialSavingEstimationState = initialState,
    action: GenericAction
) {
    switch (action.type) {
        case pendingMessage(ActionTypes.FETCH_REPORT_INITIAL_SAVING_ESTIMATION): {
            const nextState: InitialSavingEstimationState = {
                ...state,
                fetchStatus: new Map(state.fetchStatus).set(
                    action.meta.reportId,
                    'inProgress'
                )
            };

            return nextState;
        }

        case successMessage(ActionTypes.FETCH_REPORT_INITIAL_SAVING_ESTIMATION): {
            const nextState: InitialSavingEstimationState = {
                ...state,
                fetchStatus: new Map(state.fetchStatus).set(
                    action.meta.reportId,
                    'complete'
                ),
                byId: new Map(state.byId).set(action.meta.reportId, {
                    ...action.payload.data,
                    timeRequested: Date.now()
                }),
                errors: new Map(state.errors).set(action.meta.reportId, null)
            };
            return nextState;
        }

        case failureMessage(ActionTypes.FETCH_REPORT_INITIAL_SAVING_ESTIMATION): {
            const nextState: InitialSavingEstimationState = {
                ...state,
                fetchStatus: new Map(state.fetchStatus).set(
                    action.meta.reportId,
                    'complete'
                ),
                errors: new Map(state.errors).set(action.meta.reportId, action.payload)
            };
            return nextState;
        }

        default:
            return state;
    }
};
