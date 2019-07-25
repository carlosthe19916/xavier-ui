import { connect } from 'react-redux';
import UserRoute from './UserRoute';
import { GlobalState } from '../../models/state';
import * as userActions from '../../actions/UserActions';

const mapStateToProps = (state: GlobalState) => {
    const {
        userState: {
            user,
            fetchStatus,
            fetchError
        }
    } = state;
    return {
        user,
        fetchStatus,
        fetchError
    };
};

const mapDispatchToProps = {
    fetchUser: userActions.fetchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRoute);
