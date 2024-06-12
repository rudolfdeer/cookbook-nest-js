import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../constants/routes';
import Footer from '../Footer';
import ProfileSavedCookbookCard from './CookbookCard';
import ProfileSavedRecipeCard from './RecipeCard';
import HeaderConnect from '../../redux/containers/HeaderConnect';
import PopUpRecipeSaved from './PopUpRecipe';
import PopUpCookbookSaved from './PopUpCookbook';
import { ICookbook, IRecipe, IUser } from '../../interfaces';
import SERVER_URL from '../../constants/serverUrl';

import './index.scss';

type ProfileSavedPageProps = {
  cookbooks: ICookbook[];
  getUsersSavedCookbooks: (userId: number) => Promise<void>;
  recipes: IRecipe[];
  getUsersSavedRecipes: (userId: number) => Promise<void>;
  user: IUser;
};

export default function ProfileSavedPage(
  props: ProfileSavedPageProps,
): JSX.Element {
  if (!props.user) {
    return <Redirect to={ROUTES.NOT_FOUND} />;
  }

  const {
    cookbooks,
    recipes,
    user,
    getUsersSavedCookbooks,
    getUsersSavedRecipes,
  } = props;

  const { t } = useTranslation();

  const {
    name, bio, id,
  } = user;
  const photoSrc = user ? `${SERVER_URL}/${user.image}` : '../../assets/images/photo-mask.png';
  const [isRecipePopUpVisible, setRecipePopUpVisible] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);
  const [isCookbookPopUpVisible, setCookbookPopUpVisible] = useState(false);
  const [selectedCookbookId, setSelectedCookbookId] = useState(0);

  useEffect(() => {
    getUsersSavedRecipes(id);
    getUsersSavedCookbooks(id);
  }, []);

  return (
    <>
      <div className="wrapper">
        <HeaderConnect />
      </div>
      <main className="profile-page--saved">
        <div className="wrapper">
          <section className="profile-page--saved__user">
            <div className="profile-page--saved__photo">
              <img
                src={photoSrc}
                alt="User photo default"
                className="profile-page--saved__photo__image"
              />
            </div>
            <div className="profile-page--saved__user__container">
              <div className="profile-page--saved__user__name">{name}</div>
              <div className="profile-page--saved__user__bio">{bio}</div>
            </div>
          </section>
          <nav className="profile-page--saved__nav">
            <ul className="profile-page--saved__nav__list">
              <li className="list__item--selected">{t('SAVED')}</li>
              <li className="list__item">
                <Link to={ROUTES.PROFILE_COOKBOOKS}>{t('MY_COOKBOOKS')}</Link>
              </li>
              <li className="list__item">
                <Link to={ROUTES.PROFILE_RECIPES}>{t('MY_RECIPES')}</Link>
              </li>
              <li className="list__item">
                <Link to={ROUTES.PROFILE_SETTINGS}>{t('MY_SETTINGS')}</Link>
              </li>
            </ul>
          </nav>
          <section className="profile-page--saved__container--cards">
            <div className="profile-page--saved__container__title">{`Cookbooks (${cookbooks?.length})`}</div>
            <div className="profile-page--saved__cards--cookbooks">
              {cookbooks?.map((el) => (
                <ProfileSavedCookbookCard
                  id={el.id}
                  title={el.title}
                  author={el.User}
                  views={el.views}
                  likes={el.Cookbook_Likes}
                  comments={el.Cookbook_Comments}
                  image={el.image}
                  description={el.description}
                  key={el.id}
                  setCookbookPopUpVisible={setCookbookPopUpVisible}
                  setSelectedCookbookId={setSelectedCookbookId}
                  loggedInUserId = {id}
                />
              ))}
            </div>
          </section>
          <section className="profile-page--saved__container--cards">
            <div className="profile-page--saved__container__title">{`Recipes (${recipes?.length})`}</div>
            <div className="profile-page--saved__cards--recipes">
              {recipes?.map((el) => (
                <ProfileSavedRecipeCard
                  id={el.id}
                  title={el.title}
                  author={el.User}
                  views={el.views}
                  likes={el.Recipe_Likes}
                  comments={el.Recipe_Comments}
                  image={el.image}
                  description={el.description}
                  key={el.id}
                  setRecipePopUpVisible={setRecipePopUpVisible}
                  setSelectedRecipeId={setSelectedRecipeId}
                  loggedInUserId = {user.id}
                />
              ))}
            </div>
          </section>
          {isRecipePopUpVisible ? (
            <PopUpRecipeSaved
              loggedInUserId={id}
              setRecipePopUpVisible={setRecipePopUpVisible}
              recipe={recipes?.find((el) => el.id === selectedRecipeId)}
            />
          ) : null}
          {isCookbookPopUpVisible ? (
            <PopUpCookbookSaved
              loggedInUserId={id}
              setCookbookPopUpVisible={setCookbookPopUpVisible}
              cookbook={cookbooks?.find((el) => el.id === selectedCookbookId)}
            />
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
