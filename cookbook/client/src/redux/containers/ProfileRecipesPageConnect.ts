import { connect } from 'react-redux';
import ProfileRecipesPage from '../../components/ProfileRecipesPage';
import { IState } from '../../interfaces';
import {
  getusersCreatedRecipes,
  createRecipe,
  modifyRecipe,
  deleteRecipe,
  updateRecipesImage,
} from '../thunks/recipes';

function mapStateToProps(state: IState) {
  const { recipes, user } = state;

  return {
    recipes,
    user,
  };
}

const mapDispatchToProps = {
  getusersCreatedRecipes,
  createRecipe,
  modifyRecipe,
  updateRecipesImage,
  deleteRecipe,
};

const ProfileRecipesPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileRecipesPage);

export default ProfileRecipesPageConnect;
