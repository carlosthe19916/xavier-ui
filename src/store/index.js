import ReducerRegistry from '@redhat-cloud-services/frontend-components-utilities/files/ReducerRegistry';
import promiseMiddleware from 'redux-promise-middleware';
import { notifications, notificationsMiddleware } from '@redhat-cloud-services/frontend-components-notifications';
import { reportsReducer } from '../reducers/ReportsReducer';
import { reportListReducer } from '../reducers/ReportListReducer';
import { initialSavingEstimationReducer } from '../reducers/InitialSavingEstimationReducer';
import { uploadsReducer } from '../reducers/UploadsReducer';
import { userReducer } from '../reducers/UserReducer';
import { dialogDeleteReducer } from '../reducers/DialogDeleteReducer';

let registry;

export function init(...middleware) {
    if (registry) {
        throw new Error('store already initialized');
    }

    registry = new ReducerRegistry({}, [
        promiseMiddleware(),
        notificationsMiddleware({ autoDismiss: true }),
        ...middleware
    ]);

    registry.register({
        notifications,
        reportState: reportsReducer,
        reportListState: reportListReducer,
        initialSavingEstimationState: initialSavingEstimationReducer,
        uploadState: uploadsReducer,
        userState: userReducer,
        dialogDeleteState: dialogDeleteReducer
    });

    return registry;
}

export function getStore() {
    return registry.getStore();
}

export function register(...args) {
    return registry.register(...args);
}
