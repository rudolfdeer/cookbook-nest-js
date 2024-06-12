import { connect } from 'react-redux';
import ProfileusersPage from '../../components/ProfileUsersPage';
import { IState } from '../../interfaces';
import { getusersCreatedCookbooks } from '../thunks/cookbooks';

const mapStateToProps = (state: IState) => {
  const { cookbooks, user } = state;
  const loggedInuserId = user ? user.id : null;

  return {
    cookbooks,
    loggedInuserId,
  };
};

const mapDispatchToProps = {
  getusersCreatedCookbooks,
};

const ProfileusersPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileusersPage);

export default ProfileusersPageConnect;
