import { connect } from 'react-redux';
import ProfileSettingsPage from '../../components/ProfileSettingsPage';
import { IState } from '../../interfaces';
import {
  deleteUser,
  updateUser,
  changePassword,
  changeEmail,
  getLoggedInUser,
  updateUsersPhoto,
  signOut,
} from '../thunks/user';

function mapStateToProps(state: IState) {
  const { user } = state;
  return {
    user,
  };
}
const mapDispatchToProps = {
  signOut,
  deleteUser,
  updateUser,
  changePassword,
  changeEmail,
  updateUsersPhoto,
};

const ProfileSettingsPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSettingsPage);

export default ProfileSettingsPageConnect;
