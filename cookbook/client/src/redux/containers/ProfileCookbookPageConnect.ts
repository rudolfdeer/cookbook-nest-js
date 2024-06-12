import { connect } from 'react-redux';
import ProfileCookbooksPage from '../../components/ProfileCookbooksPage';
import { IState } from '../../interfaces';
import {
  getUsersCreatedCookbooks,
  createCookbook,
  modifyCookbook,
  deleteCookbook,
  updateCookbooksImage,
} from '../thunks/cookbooks';

const mapStateToProps = (state: IState) => {
  const { cookbooks, user, recipes } = state;

  return {
    cookbooks,
    user,
    recipes,
  };
};

const mapDispatchToProps = {
  getUsersCreatedCookbooks,
  createCookbook,
  modifyCookbook,
  updateCookbooksImage,
  deleteCookbook,
};

const ProfileCookbooksPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileCookbooksPage);

export default ProfileCookbooksPageConnect;
