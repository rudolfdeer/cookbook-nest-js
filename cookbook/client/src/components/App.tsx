import * as React from 'react';
import { Suspense, lazy } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import ROUTES from '../constants/routes';

const HomePageConnect = lazy(() => import('../redux/containers/HomePageConnect'));
const CookbooksPageConnect = lazy(() => import('../redux/containers/CookbooksPageConnect'));
const RecipesPageConnect = lazy(() => import('../redux/containers/RecipesPageConnect'));
const ProfileRecipesPageConnect = lazy(() => import('../redux/containers/ProfileRecipesPageConnect'));
const ProfileCookbooksPageConnect = lazy(() => import('../redux/containers/ProfileCookbookPageConnect'));
const ProfileSettingsPageConnect = lazy(() => import('../redux/containers/ProfileSettingsPageConnect'));
const LogInPageConnect = lazy(() => import('../redux/containers/LogInPageConnect'));
const ProfileSavedPageConnect = lazy(() => import('../redux/containers/ProfileSavedPageConnect'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));
const SignUpPageConnect = lazy(() => import('../redux/containers/SignUpPageConnect'));
const ProfileUsersPageConnect = lazy(() => import('../redux/containers/ProfileUsersPageConnect'));

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Suspense fallback = {<div></div>}>
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomePageConnect}></Route>
          <Route
            exact
            path={ROUTES.COOKBOOKS}
            component={CookbooksPageConnect}
          ></Route>
          <Route
            exact
            path={ROUTES.RECIPES}
            component={RecipesPageConnect}
          ></Route>
          <Route
            exact
            path={ROUTES.LOG_IN}
            component={LogInPageConnect}
          ></Route>
          <Route
            exact
            path={ROUTES.SIGN_UP}
            component={SignUpPageConnect}
          ></Route>
          <Route
            exact
            path={ROUTES.PROFILE_SETTINGS}
            component={ProfileSettingsPageConnect}
          ></Route>
          <Route
            exact
            path={ROUTES.PROFILE_RECIPES}
            component={ProfileRecipesPageConnect}
          ></Route>
          <Route
            exact
            path={ROUTES.PROFILE_COOKBOOKS}
            component={ProfileCookbooksPageConnect}
          ></Route>
          <Route
            exact
            path={ROUTES.PROFILE_SAVED}
            component={ProfileSavedPageConnect}
          ></Route>
          <Route
            exact
            path={`${ROUTES.PROFILE_USER}/:userId`}
            component={ProfileUsersPageConnect}
          ></Route>
          <Route exact path={ROUTES.NOT_FOUND} component={NotFoundPage}></Route>
        </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
