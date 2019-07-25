import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReportsUpload from './ReportsUpload';
import * as uploadActions from '../../actions/UploadActions';
import * as userActions from '../../actions/UserActions';
import { GlobalState } from '../../models/state';

const mapStateToProps = (state: GlobalState)  => {
    const {
        uploadState: {
            uploadFile,
            uploadStatus,
            uploadError,
            uploadProgress
        },
        userState: {
            user
        }
    } = state;
    return {
        user,
        uploadFile,
        uploadStatus,
        uploadError,
        uploadProgress
    };
};

const mapDispatchToProps = {
    uploadRequest: uploadActions.uploadRequest,
    updateProgress: uploadActions.updateProgress,
    selectUploadFile: uploadActions.selectUploadFile,
    resetUploadFile: uploadActions.resetUploadFile,
    updateUser: userActions.updateUser
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ReportsUpload)
);
