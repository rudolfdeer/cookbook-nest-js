import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../../constants/routes';
import CommentsIcon from '../../svg/Comments';
import LikesIcon from '../../svg/Likes';
import CommentsSection from './CommentsSection';
import PopUpRecipeCard from './RecipeCard';
import { ICookbook } from '../../../interfaces';

import './index.scss';
import SERVER_URL from '../../../constants/serverUrl';

type PopUpCookbookDetailedProps = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  cookbook: ICookbook;
  loggedInUserId: number;
  saveToUsersCookbooks: (cookbookId: number) => Promise<void>;
  saveToUsersRecipes: (recipeId: number) => Promise<void>;
  createComment: (cookbookId: number, text: string) => Promise<void>;
};

export default function PopUpCookbookDetailed(
  props: PopUpCookbookDetailedProps,
): JSX.Element {
  const { t } = useTranslation();
  const {
    setVisible,
    cookbook,
    loggedInUserId,
    saveToUsersRecipes,
    saveToUsersCookbooks,
    createComment,
  } = props;
  const {
    id,
    image,
    description,
    title,
    User,
    Cookbook_Likes,
    Cookbook_Comments,
    Recipe_Cookbooks,
  } = cookbook;

  function closePopUp(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains('overlay')
      || target.classList.contains('overlay__btn')
    ) {
      setVisible(false);
    }
  }
  const recipes = Recipe_Cookbooks.map((el) => el.Recipe);
  const likeUserIds = Cookbook_Likes.map((el) => el.UserId);
  const commentedUsersIds = Cookbook_Comments.map((el) => el.UserId);

  return (
    <div className="overlay" onClick={(e) => closePopUp(e)}>
      <div className="overlay__content--cookbook">
        <div className="pop-up--cookbook">
          <div className="pop-up--cookbook__section--top">
            <div className="pop-up--cookbook__title">{title}</div>
            {loggedInUserId && loggedInUserId !== User.id ? (
              <button
                className="pop-up--cookbook__btn"
                onClick={() => {
                  saveToUsersCookbooks(id);
                  setVisible(false);
                }}
              >
                {t('CLONE_TO_MY_CB')}
              </button>
            ) : null}
          </div>
          <div className="pop-up--cookbook__author">
            <Link to={`${ROUTES.PROFILE_USER}/${User.id}`}>{User.name}</Link>
          </div>
          <div className="pop-up--cookbook__section--description">
            <div className="pop-up--cookbook__image">
              <img src={`${SERVER_URL}/${image}`} alt="Cookbook image" />
            </div>
            <div className="pop-up--cookbook__section--description__text">
              <div className="pop-up--cookbook__section__title">
                {t('DESCRIPTION')}
              </div>
              <p>{description}</p>
            </div>
          </div>
          <div className="pop-up--cookbook__section--statistics">
            <div className="card__statistics-item--likes">
              <LikesIcon
                loggedInUserId={loggedInUserId}
                likeUserIds={likeUserIds}
                id={id}
              />
              {Cookbook_Likes.length} <span>&nbsp;{t('LIKES')}</span>
            </div>
            <div className="card__statistics-item comments">
              <CommentsIcon
                commentedUsersIds={commentedUsersIds}
                loggedInUserId={loggedInUserId}
              />
              {Cookbook_Comments.length} <span>&nbsp;{t('COMMENTS')}</span>
            </div>
          </div>
          <div className="pop-up--cookbook__section--recipes">
            <div className="pop-up--cookbook__section__title">
              {t('RECIPES')}
            </div>
            <div className="pop-up--cookbook__section--recipes__cards">
              {recipes?.map((el) => (
                <PopUpRecipeCard
                  title={el.title}
                  user={el.User}
                  views={el.views}
                  description={el.description}
                  likes={el.Recipe_Likes}
                  image={el.image}
                  comments={el.Recipe_Comments}
                  key={el.id}
                  id={el.id}
                  loggedInUserId={loggedInUserId}
                  saveToUsersRecipes={saveToUsersRecipes}
                  setVisible={setVisible}
                />
              ))}
            </div>
          </div>
          <div className="pop-up--cookbook__section--comments">
            <div className="pop-up--cookbook__section__title">{`${t(
              'COMMENTS_SECTION',
            )} (${Cookbook_Comments.length})`}</div>
            <CommentsSection
              comments={Cookbook_Comments}
              loggedInUserId={loggedInUserId}
              cookbookId={id}
              createComment={createComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
