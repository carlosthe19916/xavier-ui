import {
    ActionTypes
} from '../actions/ReportActions';
import {
    pendingMessage,
    successMessage,
    failureMessage
} from './reducerHelper';
import { ReportState } from '../models/state';
import { GenericAction } from '../models/action';

export const initialState: ReportState = {
    byId: new Map(),
    fetchStatus: new Map(),
    errors: new Map()
};

export const reportsReducer = function (
    state: ReportState = initialState,
    action: GenericAction
) {
    switch (action.type) {
        case pendingMessage(ActionTypes.FETCH_REPORT): {
            const nextState: ReportState = {
                ...state,
                fetchStatus: new Map(state.fetchStatus).set(
                    action.meta.reportId,
                    'inProgress'
                )
            };

            return nextState;
        }

        case successMessage(ActionTypes.FETCH_REPORT): {
            const nextState: ReportState = {
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

        case failureMessage(ActionTypes.FETCH_REPORT): {
            const nextState: ReportState = {
                ...state,
                fetchStatus: new Map(state.fetchStatus).set(
                    action.meta.reportId,
                    'complete'
                ),
                errors: new Map(state.errors).set(action.meta.reportId, action.payload)
            };
            return nextState;
        }

        // DELETE_REPORT single report
        case successMessage(ActionTypes.DELETE_REPORT): {
            const reportId = action.meta.reportId;

            const fetchStatus = new Map(state.fetchStatus);
            const errors = new Map(state.errors);
            const byId = new Map(state.byId);

            fetchStatus.delete(reportId);
            errors.delete(reportId);
            byId.delete(reportId);

            const nextState: ReportState = {
                ...state,
                fetchStatus,
                errors,
                byId
            };
            return nextState;
        }

        default:
            return state;
    }
};
