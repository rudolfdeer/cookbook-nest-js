import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import SERVER_URL from '../../../constants/serverUrl';
import { IRecipe } from '../../../interfaces';
import CommentsIcon from '../../svg/Comments';
import LikesIcon from '../../svg/Likes';

import './index.scss';

type PopUpRecipeSavedProps = {
  setRecipePopUpVisible: Dispatch<SetStateAction<boolean>>;
  recipe: IRecipe;
  loggedInUserId: number;
};

export default function PopUpRecipeSaved(
  props: PopUpRecipeSavedProps,
): JSX.Element {
  const { t } = useTranslation();
  const { setRecipePopUpVisible, recipe, loggedInUserId } = props;

  const {
    image,
    description,
    title,
    User,
    Recipe_Likes,
    Recipe_Comments,
    directions,
    ingredients,
  } = recipe;

  const closePopUp = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('overlay')) {
      setRecipePopUpVisible(false);
    }
  };

  const likeUserIds = Recipe_Likes.map((el) => el.UserId);
  const commentedUsersIds = Recipe_Comments.map((el) => el.UserId);

  return (
    <div className="overlay" onClick={(e) => closePopUp(e)}>
      <div className="overlay__content--recipe">
        <div className="overlay__content--recipe__wrapper">
          <div className="pop-up--recipe">
            <div className="pop-up--recipe__image">
              <img src={`${SERVER_URL}/${image}`} alt="" className="img" />
            </div>
            <div className="pop-up--recipe__sections">
              <div className="pop-up--recipe__section--top">
                <div className="pop-up--recipe__title">{title}</div>
              </div>
              <div className="pop-up--recipe__author">{User.name}</div>
              <div className="pop-up--recipe__section--description">
                <div className="pop-up--recipe__section--description__wrapper">
                  <div className="pop-up--recipe__section--description__title">
                    {t('DESCRIPTION')}
                  </div>
                  <p>{description}</p>
                </div>
              </div>
              <div className="pop-up--recipe__section--information">
                <div className="pop-up--recipe__section--information__directions">
                  <div className="pop-up--recipe__section--information__title">
                    {t('DIRECTIONS')}
                  </div>
                  <ul className="pop-up--recipe__section--information__list">
                    {directions.map((el: string) => (
                      <li key={Math.random()}>
                        <span>{`Step ${directions.indexOf(el) + 1}`}</span>:{' '}
                        {el}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pop-up--recipe__section--information__ingredients">
                  <div className="pop-up--recipe__section--information__title">
                    {t('INGREDIENTS')}
                  </div>
                  <ul className="pop-up--recipe__section--information__list--marked">
                    {ingredients.map((el: string) => (
                      <li key={Math.random()}>{el}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pop-up--recipe__section--statistics">
                <div className="card__statistics-item likes">
                  <LikesIcon
                    likeUserIds={likeUserIds}
                    loggedInUserId={loggedInUserId}
                  />
                  {Recipe_Likes.length} <span>&nbsp;{t('LIKES')}</span>
                </div>
                <div className="card__statistics-item comments">
                  <CommentsIcon
                    commentedUsersIds={commentedUsersIds}
                    loggedInUserId={loggedInUserId}
                  />
                  {Recipe_Comments.length} <span>&nbsp;{t('COMMENTS')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
