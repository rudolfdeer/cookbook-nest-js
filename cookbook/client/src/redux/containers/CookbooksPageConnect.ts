import { connect } from 'react-redux';
import CookbooksPage from '../../components/SearchCookbooksPage';
import {
  getAllCookbooks,
  sortCookbooks,
  filterCookbooks,
  createComment,
  hideUsersCookbooks,
  likeCookbook,
} from '../thunks/cookbooks';
import { getAllRecipes } from '../thunks/recipes';
import { getLoggedInUser, saveToUsersCookbooks, saveToUsersRecipes } from '../thunks/user';
import { IState } from '../../interfaces';

const mapStateToProps = (state: IState) => {
  const { user, cookbooks, recipes } = state;
  const loggedInUserId = user ? user.id : null;

  return {
    cookbooks,
    recipes,
    loggedInUserId,
  };
};

const mapDispatchToProps = {
  getAllCookbooks,
  getAllRecipes,
  sortCookbooks,
  filterCookbooks,
  saveToUsersCookbooks,
  saveToUsersRecipes,
  createComment,
  hideUsersCookbooks,
  likeCookbook,
  getLoggedInUser,
};

const CookbooksPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CookbooksPage);

export default CookbooksPageConnect;
