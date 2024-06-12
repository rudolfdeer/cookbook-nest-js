import { connect } from 'react-redux';
import SignUpPage from '../../components/SignUpPage';
import { signUp } from '../thunks/user';

const mapDispatchToProps = {
  signUp,
};

const SignUpPageConnect = connect(null, mapDispatchToProps)(SignUpPage);

export default SignUpPageConnect;
