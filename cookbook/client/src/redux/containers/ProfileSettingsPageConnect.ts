import { connect } from 'react-redux';
import ProfileSettingsPage from '../../components/ProfileSettingsPage';
import { IState } from '../../interfaces';
import {
  deleteuser,
  updateuser,
  changePassword,
  changeEmail,
  getLoggedInuser,
  updateusersPhoto,
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
  deleteuser,
  updateuser,
  changePassword,
  changeEmail,
  updateusersPhoto,
};

const ProfileSettingsPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettingsPage);

export default ProfileSettingsPageConnect;
