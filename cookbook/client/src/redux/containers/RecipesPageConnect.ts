import { connect } from 'react-redux';
import RecipesPage from '../../components/SearchRecipesPage';
import {
  filterRecipes,
  getAllRecipes,
  sortRecipes,
  createComment,
  likeRecipe,
} from '../thunks/recipes';
import { saveTousersRecipes } from '../thunks/user';
import { IState } from '../../interfaces';

function mapStateToProps(state: IState) {
  const { user, recipes } = state;
  const loggedInuserId = user ? user.id : null;

  return {
    recipes,
    loggedInuserId,
  };
}

const mapDispatchToProps = {
  getAllRecipes,
  sortRecipes,
  filterRecipes,
  saveTousersRecipes,
  createComment,
  likeRecipe,
};

const RecipesPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesPage);

export default RecipesPageConnect;
