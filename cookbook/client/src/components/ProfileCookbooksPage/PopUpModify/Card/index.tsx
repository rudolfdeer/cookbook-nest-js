import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import SERVER_URL from '../../../../constants/serverUrl';
import { IRecipeComment, IRecipeLike, IUser } from '../../../../interfaces';
import CommentsIcon from '../../../svg/Comments';
import LikesIcon from '../../../svg/Likes';
import ViewsIcon from '../../../svg/Views';

import './index.scss';

type PopUpRecipeCardProps = {
  title: string;
  author: IUser;
  description: string;
  views: number;
  likes: IRecipeLike[];
  image: string;
  comments: IRecipeComment[];
  id: number;
  loggedInUserId: number;
  setNewRecipesIds: Dispatch<SetStateAction<number[]>>;
  recipesIds: number[];
};

export default function PopUpRecipeCard(
  props: PopUpRecipeCardProps,
): JSX.Element {
  const {
    views,
    image,
    description,
    title,
    author,
    likes,
    comments,
    id,
    setNewRecipesIds,
    recipesIds,
    loggedInUserId,
  } = props;

  const { t } = useTranslation();

  const deleteRecipeFromCookbook = (recipeId: number) => {
    const newRecipesIds = recipesIds.filter((el) => el !== recipeId);
    setNewRecipesIds(newRecipesIds);
  };
  const likeUserIds = likes.map((el) => el.UserId);
  const commentedUsersIds = comments.map((el) => el.UserId);

  return (
    <div className="card">
      <div
        className="card__image"
        style={{ background: `url(${SERVER_URL}/${image}) center no-repeat` }}
      ></div>
      <div className="card__content">
        <div className="card__info-container top">
          <div className="card__title">{title}</div>
          <div className="card__author">{author.name}</div>
        </div>
        <div className="card__info-container--description">
          <p className="card__description">{description}</p>
        </div>
        <div className="card__info-container--bottom">
          <div className="card__statistics">
            <div className="card__statistics-item views">
              <ViewsIcon />
              {views} {t('VIEWS')}
            </div>
            <div className="card__statistics-item likes">
              <LikesIcon likeUserIds = {likeUserIds} loggedInUserId={loggedInUserId}/>
              {likes.length} {t('LIKES')}
            </div>
            <div className="card__statistics-item comments">
              <CommentsIcon commentedUsersIds={commentedUsersIds} loggedInUserId={loggedInUserId}/>
              {comments.length} {t('COMMENTS')}
            </div>
            <button
              className="card__btn--delete"
              onClick={() => deleteRecipeFromCookbook(id)}
            >
              {t('DELETE_FROM_COOKBOOK_BTN')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
