import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import CommentsIcon from '../../../svg/Comments';
import LikesIcon from '../../../svg/Likes';
import ViewsIcon from '../../../svg/Views';
import { IRecipeComment, IRecipeLike, IUser } from '../../../../interfaces';
import SERVER_URL from '../../../../constants/serverUrl';

import './index.scss';

type PopUpRecipeCardProps = {
  title: string;
  user: IUser;
  description: string;
  views: number;
  image: string;
  comments: IRecipeComment[];
  id: number;
  loggedInUserId: number;
  likes: IRecipeLike[];
  saveToUsersRecipes: (recipeId: number) => Promise<void>;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function PopUpRecipeCard(
  props: PopUpRecipeCardProps,
): JSX.Element {
  const { t } = useTranslation();
  const {
    views,
    image,
    description,
    title,
    user,
    likes,
    comments,
    id,
    loggedInUserId,
    saveToUsersRecipes,
    setVisible,
  } = props;

  const likeUserIds = likes.map((el) => el.UserId);
  const commentedUsersIds = comments.map((el) => el.UserId);

  return (
    <div className="card">
      <div className="card__image">
        <img src={`${SERVER_URL}/${image}`} alt="Recipe image" />
      </div>
      <div className="card__content">
        <div className="card__info-container top">
          <div className="card__title">{title}</div>
          <div className="card__author">{user.name}</div>
        </div>
        <div className="card__info-container--description">
          <p className="card__description">{description}</p>
        </div>
        <div className="card__info-container--bottom">
          <div className="card__statistics">
            <div className="card__statistics-item">
              <ViewsIcon />
              {views} <span>&nbsp;{t('VIEWS')}</span>
            </div>
            <div className="card__statistics-item">
              <LikesIcon
                likeUserIds={likeUserIds}
                loggedInUserId={loggedInUserId}
                id={id}
              />
              {likes.length} <span>&nbsp;{t('LIKES')}</span>
            </div>
            <div className="card__statistics-item">
              <CommentsIcon
                commentedUsersIds={commentedUsersIds}
                loggedInUserId={loggedInUserId}
              />
              {comments.length} <span>&nbsp;{t('COMMENTS')}</span>
            </div>
          </div>
          {loggedInUserId && loggedInUserId !== user.id ? (
            <button
              className="card__btn"
              onClick={() => {
                saveToUsersRecipes(id);
                setVisible(false);
              }}
            >
              <span>{t('SAVE_BTN')}</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
