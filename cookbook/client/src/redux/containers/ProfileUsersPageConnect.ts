import { connect } from 'react-redux';
import ProfileUsersPage from '../../components/ProfileUsersPage';
import { IState } from '../../interfaces';
import { getUsersCreatedCookbooks } from '../thunks/cookbooks';

const mapStateToProps = (state: IState) => {
  const { cookbooks, user } = state;
  const loggedInUserId = user ? user.id : null;

  return {
    cookbooks,
    loggedInUserId,
  };
};

const mapDispatchToProps = {
  getUsersCreatedCookbooks,
};

const ProfileUsersPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileUsersPage);

export default ProfileUsersPageConnect;
