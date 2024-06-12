import { connect } from 'react-redux';
import { getusersSavedRecipes } from '../thunks/recipes';
import { getusersSavedCookbooks } from '../thunks/cookbooks';
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
  getusersSavedRecipes,
  getusersSavedCookbooks,
};

const ProfileSavedPageConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSavedPage);

export default ProfileSavedPageConnect;
