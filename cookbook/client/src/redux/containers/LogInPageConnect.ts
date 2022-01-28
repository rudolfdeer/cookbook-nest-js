import { connect } from 'react-redux';
import LogInPage from '../../components/LogInPage';
import { IState } from '../../interfaces';
import { signIn, getLoggedInUser } from '../thunks/user';

function mapStateToProps(state: IState) {
  const { user } = state;

  return {
    user,
  };
}

const mapDispatchToProps = {
  signIn,
  getLoggedInUser,
};

const LogInPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInPage);

export default LogInPageConnect;
