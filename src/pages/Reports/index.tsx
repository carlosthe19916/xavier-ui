import { connect } from 'react-redux';
import Reports from './Reports';
import { withRouter } from 'react-router';
import { GlobalState } from '../../models/state';
import  * as reportActions from '../../actions/ReportActions';
import  * as dialogDeleteActions from '../../actions/DialogDeleteActions';

const mapStateToProps = (state: GlobalState)  => {
    const {
        reportListState: {
            total,
            items,
            fetchError,
            fetchStatus
        }
    } = state;
    return {
        total,
        items,
        fetchError,
        fetchStatus
    };
};

const mapDispatchToProps = {
    fetchReports: reportActions.fetchReports,
    deleteReport: reportActions.deleteReport,
    showDeleteDialog: dialogDeleteActions.openModal,
    closeDeleteDialog: dialogDeleteActions.closeModal
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Reports)
);
