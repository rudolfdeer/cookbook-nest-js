import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer';
import ProfileRecipeCard from './Card';
import ROUTES from '../../constants/routes';
import PopUpCreateRecipe from './PopUpCreate';
import PopUpModifyRecipe from './PopUpModify';
import HeaderConnect from '../../redux/containers/HeaderConnect';
import { IRecipe, IRecipeRequestBody, IUser } from '../../interfaces';

import './index.scss';
import SERVER_URL from '../../constants/serverUrl';

type ProfileRecipesPageProps = {
  recipes: IRecipe[];
  getUsersCreatedRecipes: (userId: number) => void;
  user: IUser;
  createRecipe: (
    data: FormData,
    userId: number,
  ) => Promise<void>;
  modifyRecipe: (
    recipeId: number,
    data: IRecipeRequestBody,
    userId: number
  ) => Promise<void>;
  updateRecipesImage: (
    recipeId: number,
    data: FormData,
    userId: number
  ) => Promise<void>;
  deleteRecipe: (recipeId: number, userId: number) => Promise<void>;
};

export default function ProfileRecipesPage(
  props: ProfileRecipesPageProps,
): JSX.Element {
  if (!props.user) {
    return <Redirect to={ROUTES.NOT_FOUND} />;
  }

  const {
    recipes,
    user,
    getUsersCreatedRecipes,
    createRecipe,
    modifyRecipe,
    updateRecipesImage,
    deleteRecipe,
  } = props;

  const { t } = useTranslation();
  const [isCreatePopUpVisible, setCreatePopUpVisible] = useState(false);
  const [isModifyPopUpVisible, setModifyPopUpVisible] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);
  const { name, bio, id } = user;

  useEffect(() => {
    getUsersCreatedRecipes(user.id);
  }, []);

  const photoSrc = user ? `${SERVER_URL}/${user.image}` : '../../assets/images/photo-mask.png';

  return (
    <>
      <div className="wrapper">
        <HeaderConnect />
      </div>
      <main className="profile-page--recipes">
        <div className="wrapper">
          <section className="profile-page--recipes__content">
            <div className="profile-page--recipes__photo">
              <img
                src={photoSrc}
                alt="User photo default"
                className="profile-page--recipes__photo__image"
              />
            </div>
            <div className="profile-page--recipes__user">
              <div className="profile-page--recipes__user__name">{name}</div>
              <div className="profile-page--recipes__user__bio">{bio}</div>
            </div>
          </section>
          <nav className="profile-page--recipes__nav">
            <ul className="profile-page--recipes__nav__list">
              <li className="list__item">
                <Link to={ROUTES.PROFILE_SAVED}>{t('SAVED')}</Link>
              </li>
              <li className="list__item">
                <Link to={ROUTES.PROFILE_COOKBOOKS}>{t('MY_COOKBOOKS')}</Link>
              </li>
              <li className="list__item--selected">{t('MY_RECIPES')}</li>
              <li className="list__item">
                <Link to={ROUTES.PROFILE_SETTINGS}>{t('MY_SETTINGS')}</Link>
              </li>
            </ul>
            <button
              className="profile-page--recipes__nav__btn"
              onClick={() => setCreatePopUpVisible(true)}
            >
              {t('CREATE_NEW_RECIPE')}
            </button>
          </nav>
          <section className="profile-page--recipes__cards">
            {recipes?.map((el) => (
              <ProfileRecipeCard
                id={el.id}
                title={el.title}
                author={el.User}
                views={el.views}
                comments={el.Recipe_Comments?.length}
                image={el.image}
                description={el.description}
                key={el.id}
                setModifyPopUpVisible={setModifyPopUpVisible}
                setSelectedRecipeId={setSelectedRecipeId}
                deleteRecipe={deleteRecipe}
                loggedInUserId={id}
                likes={el.Recipe_Likes}
              />
            ))}
          </section>
          {isCreatePopUpVisible ? (
            <PopUpCreateRecipe
              loggedInUserId={id}
              setCreatePopUpVisible={setCreatePopUpVisible}
              createRecipe={createRecipe}
            />
          ) : null}
          {isModifyPopUpVisible ? (
            <PopUpModifyRecipe
              loggedInUserId={id}
              setModifyPopUpVisible={setModifyPopUpVisible}
              selectedRecipe={recipes.find((el) => el.id === selectedRecipeId)}
              modifyRecipe={modifyRecipe}
              updateRecipesImage = {updateRecipesImage}
            />
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
