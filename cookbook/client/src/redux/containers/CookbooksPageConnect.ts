// import { connect } from 'react-redux';
// import CookbooksPage from '../../components/SearchCookbooksPage';
// import {
//   getAllCookbooks,
//   sortCookbooks,
//   filterCookbooks,
//   createComment,
//   hideusersCookbooks,
//   likeCookbook,
// } from '../thunks/cookbooks';
// import { getAllRecipes } from '../thunks/recipes';
// import {
//   getLoggedInuser,
//   saveTousersCookbooks,
//   saveTousersRecipes,
// } from '../thunks/user';
// import { IState } from '../../interfaces';

// const mapStateToProps = (state: IState) => {
//   const { user, cookbooks, recipes } = state;
//   const loggedInuserId = user ? user.id : null;

//   return {
//     cookbooks,
//     recipes,
//     loggedInuserId,
//   };
// };

// const mapDispatchToProps = {
//   getAllCookbooks,
//   getAllRecipes,
//   sortCookbooks,
//   filterCookbooks,
//   saveTousersCookbooks,
//   saveTousersRecipes,
//   createComment,
//   hideusersCookbooks,
//   likeCookbook,
//   getLoggedInuser,
// };

// const CookbooksPageConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CookbooksPage);

// export default CookbooksPageConnect;
