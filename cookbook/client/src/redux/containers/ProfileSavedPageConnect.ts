import { connect } from 'react-redux';
import { getUsersSavedRecipes } from '../thunks/recipes';
import { getUsersSavedCookbooks } from '../thunks/cookbooks';
import ProfileSavedPage from '../../components/ProfileSavedPage';
import { IState } from '../../interfaces';

function mapStateToProps(state: IState) {
  const { recipes, user, cookbooks } = state;

  return {
    recipes,
    cookbooks,
    user,
  };
}

const mapDispatchToProps = {
  getUsersSavedRecipes,
  getUsersSavedCookbooks,
};

const ProfileSavedPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSavedPage);

export default ProfileSavedPageConnect;
