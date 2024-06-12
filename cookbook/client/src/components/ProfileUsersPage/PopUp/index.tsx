import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../../constants/routes';
import CommentsIcon from '../../svg/Comments';
import LikesIcon from '../../svg/Likes';

import './index.scss';
import PopUpRecipeCard from './RecipeCard';
import { ICookbook } from '../../../interfaces';
import SERVER_URL from '../../../constants/serverUrl';

type PopUpCookbookProps = {
  setPopUpCookbookVisible: Dispatch<SetStateAction<boolean>>;
  cookbook: ICookbook;
  loggedInuserId: number;
};

export default function PopUpCookbook(props: PopUpCookbookProps): JSX.Element {
  const { t } = useTranslation();
  const { setPopUpCookbookVisible, cookbook, loggedInuserId } = props;
  const { image, description, title, user, likes, comments, recipes } =
    cookbook;

  const likeuserIds = likes.map((el) => el.userId);
  const commentedusersIds = comments.map((el) => el.userId);
  const recipesInCb = recipes.map((el) => el.Recipe);

  function closePopUp(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains('overlay') ||
      target.classList.contains('overlay__btn')
    ) {
      setPopUpCookbookVisible(false);
    }
  }

  return (
    <div className="overlay" onClick={(e) => closePopUp(e)}>
      <div className="overlay__content">
        <div className="pop-up--users-cookbook">
          <div className="pop-up--users-cookbook__section--top">
            <div className="pop-up--users-cookbook__title">{title}</div>
          </div>

          <div className="pop-up--users-cookbook__author">
            <Link to={`${ROUTES.PROFILE_user}/${user.id}`}>{user.name}</Link>
          </div>
          <div className="pop-up--users-cookbook__section--description">
            <div
              className="pop-up--users-cookbook__image"
              style={{
                background: `url(${SERVER_URL}/${image}) center no-repeat`,
              }}
            ></div>
            <div className="pop-up--users-cookbook__section--description__text">
              <div className="pop-up--users-cookbook__section__title">
                {t('DESCRIPTION')}
              </div>
              <p>{description}</p>
            </div>
          </div>
          <div className="pop-up--users-cookbook__section--statistics">
            <div className="card__statistics-item likes">
              <LikesIcon
                likeuserIds={likeuserIds}
                loggedInuserId={loggedInuserId}
              />
              {likes.length} {t('LIKES')}
            </div>
            <div className="card__statistics-item comments">
              <CommentsIcon
                commentedusersIds={commentedusersIds}
                loggedInuserId={loggedInuserId}
              />
              {comments.length} {t('COMMENTS')}
            </div>
          </div>
          <div className="pop-up--users-cookbook__section--recipes">
            <div className="pop-up--users-cookbook__section__title">
              {t('RECIPES')}
            </div>
            <div className="pop-up--users-cookbook__section--recipes__cards">
              {recipesInCb?.map((el) => (
                <PopUpRecipeCard
                  title={el.title}
                  author={el.user}
                  views={el.views}
                  description={el.description}
                  likes={el.likes.length}
                  image={el.image}
                  comments={el.comments.length}
                  key={el.id}
                  setPopUpCookbookVisible={setPopUpCookbookVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
