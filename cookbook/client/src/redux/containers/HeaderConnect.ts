import { connect } from 'react-redux';
import Header from '../../components/Header';
import { IState } from '../../interfaces';
import { getLoggedInUser } from '../thunks/user';

const mapStateToProps = (state: IState) => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = {
  getLoggedInUser,
};

const HeaderConnect = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderConnect;
