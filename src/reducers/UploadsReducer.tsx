import {
    pendingMessage,
    successMessage,
    failureMessage
} from './reducerHelper';
import {
    ActionTypes
} from '../actions/UploadActions';
import { GenericAction } from '../models/action';
import { UploadState } from '../models/state';

export const initialState: UploadState = {
    uploadFile: null,
    uploadStatus: 'none',
    uploadError: null,
    uploadProgress: 0
};

export const uploadsReducer = function (
    state: UploadState = initialState,
    action: GenericAction
) {
    switch (action.type) {
        case ActionTypes.UPDATE_PROGRESS: {
            const nextState: UploadState = {
                ...state,
                uploadProgress: action.payload.progress
            };
            return nextState;
        }

        case ActionTypes.SELECT_UPLOAD_FILE: {
            const nextState: UploadState = {
                ...initialState,
                uploadFile: action.payload.file
            };
            return nextState;
        }

        case ActionTypes.RESET_UPLOAD_FILE: {
            return {
                ...initialState
            };
        }

        //
        case pendingMessage(ActionTypes.UPLOAD_REQUEST): {
            const nextState: UploadState = {
                ...state,
                uploadStatus: 'inProgress'
            };
            return nextState;
        }

        case successMessage(ActionTypes.UPLOAD_REQUEST): {
            const nextState: UploadState = {
                ...state,
                uploadError: null,
                uploadStatus: 'complete'
            };
            return nextState;
        }

        case failureMessage(ActionTypes.UPLOAD_REQUEST): {
            const nextState: UploadState = {
                ...state,
                uploadError: action.payload,
                uploadStatus: 'complete'
            };
            return nextState;
        }

        default:
            return state;
    }
};
