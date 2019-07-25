import {
    Report,
    ReportInitialSavingEstimation
} from '../Report';
import { User } from '../User';
import { AxiosError } from 'axios';

export type FetchStatus = 'none' | 'inProgress' | 'complete';

export interface CachedReport extends Report {
    timeRequested: number;
}

export interface ReportState {
    byId: Map<string, CachedReport>;
    fetchStatus: Map<string, FetchStatus>;
    errors: Map<string, AxiosError>;
}

export interface ReportListState {
    total: number;
    items: Report[];
    fetchError: AxiosError | null;
    fetchStatus: FetchStatus;
}

export interface CachedReportInitialSavingEstimation extends ReportInitialSavingEstimation {
    timeRequested: number;
}

export interface InitialSavingEstimationState {
    byId: Map<string, CachedReportInitialSavingEstimation>;
    fetchStatus: Map<string, FetchStatus>;
    errors: Map<string, AxiosError>;
}

export interface UploadState {
    uploadFile: File | null;
    uploadStatus: FetchStatus;
    uploadError: AxiosError | null;
    uploadProgress: number;
}

export interface UserState {
    user: User | null;
    fetchError: AxiosError | null;
    fetchStatus: FetchStatus;
}

export type DialogDeleteState = {
    isOpen: boolean;
    isProcessing: boolean;
    isError: boolean;
    name: string;
    type: string;
    onDelete: () => void;
    onCancel: () => void;
};

/**
 * The fields of this interface should match the /store/index.js
 */
export interface GlobalState {
    reportState: ReportState;
    reportListState: ReportListState;
    initialSavingEstimationState: InitialSavingEstimationState;
    uploadState: UploadState;
    userState: UserState;
    dialogDeleteState: DialogDeleteState;
}
