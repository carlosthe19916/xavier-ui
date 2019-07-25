import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import InitialSavingsEstimation from './InitialSavingsEstimation';
import { GlobalState } from '../../../models/state';
import * as reportActions from '../../../actions/ReportActions';

const mapStateToProps = (state: GlobalState, props: any) => {
    const { report } = props;

    const initialSavingsEstimation = state.initialSavingEstimationState.byId.get(report.id) || null;
    const initialSavingsEstimationFetchError = state.initialSavingEstimationState.errors.get(report.id) || null;
    const initialSavingsEstimationFetchStatus = state.initialSavingEstimationState.fetchStatus.get(report.id) || null;

    return {
        report,
        initialSavingsEstimation,
        initialSavingsEstimationFetchError,
        initialSavingsEstimationFetchStatus
    };
};

const mapDispatchToProps = {
    fetchReportInitialSavingEstimation: reportActions.fetchReportInitialSavingEstimation
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InitialSavingsEstimation)
);
