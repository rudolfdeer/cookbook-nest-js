import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LikesIcon from '../../svg/Likes';
import ViewsIcon from '../../svg/Views';
import CommentsIcon from '../../svg/Comments';
import { IRecipeLike, IUser } from '../../../interfaces';
import SERVER_URL from '../../../constants/serverUrl';

import './index.scss';

type ProfileRecipeCardProps = {
  id: number;
  title: string;
  author: IUser;
  description: string;
  views: number;
  likes: IRecipeLike[];
  image: string;
  comments: number;
  setModifyPopUpVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedRecipeId: Dispatch<SetStateAction<number>>;
  deleteRecipe: (recipeId: number, userId: number) => Promise<void>;
  loggedInUserId: number;
};

export default function ProfileRecipeCard(
  props: ProfileRecipeCardProps,
): JSX.Element {
  const {
    id,
    views,
    image,
    description,
    title,
    author,
    comments,
    setModifyPopUpVisible,
    setSelectedRecipeId,
    loggedInUserId,
    deleteRecipe,
    likes,
  } = props;

  const { t } = useTranslation();
  const [isBtnDeleteVisible, setBtnDeleteVisible] = useState(false);

  const btnDelete = (
    <div className="card__statistics-item__menu">
      <button
        className="card__statistics-item__menu__btn--delete"
        onClick={() => {
          setBtnDeleteVisible(false);
          deleteRecipe(id, loggedInUserId);
        }}
      >
        {t('DELETE_RECIPE')}
      </button>
    </div>
  );

  const likeUserIds = likes.map((el) => el.UserId);

  return (
    <div className="card">
      <div className="card__image">
        <img src={`${SERVER_URL}/${image}`} alt="Recipe image" />
      </div>
      <div className="card__content">
        <div className="card__info-container top">
          <div
            className="card__title"
            onClick={() => {
              setSelectedRecipeId(id);
              setModifyPopUpVisible(true);
            }}
          >
            {title}
          </div>
          <div className="card__author">{author.name}</div>
        </div>
        <div className="card__info-container--description">
          <p className="card__description">{description}</p>
        </div>
        <div className="card__info-container--bottom">
          <div className="card__statistics">
            <div className="card__statistics-item">
              <ViewsIcon />
              {views} <span>{t('VIEWS')}</span>
            </div>
            <div className="card__statistics-item">
              <LikesIcon
                likeUserIds={likeUserIds}
                loggedInUserId={loggedInUserId}
                id={id}
              />
              {likes.length} <span>{t('LIKES')}</span>
            </div>
            <div className="card__statistics-item">
              <CommentsIcon />
              {comments} <span>{t('COMMENTS')}</span>
            </div>
          </div>
          <svg
            className="card__statistics-item__icon--dots"
            width="20"
            height="4"
            viewBox="0 0 20 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setBtnDeleteVisible((prevState) => !prevState);
            }}
          >
            <circle cx="2" cy="2" r="2" fill="#dadada" />
            <circle cx="10" cy="2" r="2" fill="#dadada" />
            <circle cx="18" cy="2" r="2" fill="#dadada" />
          </svg>
          {isBtnDeleteVisible ? btnDelete : null}
        </div>
      </div>
    </div>
  );
}
