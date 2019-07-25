import { GlobalState } from '../../models/state';
import { withRouter } from 'react-router';
import ReportView from './ReportView';
import { fetchReport } from '../../actions/ReportActions';
import { connect } from 'react-redux';

const mapStateToProps = (state: GlobalState, props: any)  => {
    const reportId = props.match.params.reportId;

    const report = state.reportState.byId.get(reportId) || null;
    const reportFetchError = state.reportState.errors.get(reportId) || null;
    const reportFetchStatus = state.reportState.fetchStatus.get(reportId) || null;

    return {
        report,
        reportFetchStatus,
        reportFetchError
    };
};

const mapDispatchToProps = {
    fetchReport
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ReportView)
);
