import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CommentsIcon from '../../svg/Comments';
import LikesIcon from '../../svg/Likes';
import ViewsIcon from '../../svg/Views';
import { ICookbookLike, IUser } from '../../../interfaces';
import SERVER_URL from '../../../constants/serverUrl';

import './index.scss';

type ProfileCookbookCardProps = {
  id: number;
  title: string;
  author: IUser;
  description: string;
  views: number;
  likes: ICookbookLike[];
  image: string;
  comments: number;
  setSelectedCookbookId: Dispatch<SetStateAction<number>>;
  setModifyPopUpVisible: Dispatch<SetStateAction<boolean>>;
  loggedInUserId: number;
  deleteCookbook: (cookbookId: number, userId: number) => Promise<void>;
};

export default function ProfileCookbookCard(
  props: ProfileCookbookCardProps,
): JSX.Element {
  const {
    id,
    views,
    image,
    description,
    title,
    author,
    likes,
    comments,
    setSelectedCookbookId,
    setModifyPopUpVisible,
    deleteCookbook,
    loggedInUserId,
  } = props;

  const { t } = useTranslation();
  const [isBtnDeleteVisible, setBtnDeleteVisible] = useState(false);

  const likeUserIds = likes.map((el) => el.UserId);

  const btnDelete = (
    <div className="card__statistics-item__menu">
      <button
        className="card__statistics-item__menu__btn"
        onClick={() => {
          setBtnDeleteVisible(false);
          deleteCookbook(id, loggedInUserId);
        }}
      >
        {t('DELETE_COOKBOOK')}
      </button>
    </div>
  );

  return (
    <div className="card">
      <div className="card__info-container">
        <div className="card__statistics-item">
          <ViewsIcon />
          {views} {t('VIEWS')}
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
      <div className="card__info-container">
        <div
          className="card__image">
          <img
        src={`${SERVER_URL}/${image}`}
        alt="Cookbook image"
      /></div>
      </div>

      <div className="card__info-container">
        <div
          className="card__title"
          onClick={() => {
            setSelectedCookbookId(id);
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
        <div className="card__statistics-item likes">
          <LikesIcon likeUserIds = {likeUserIds} loggedInUserId={loggedInUserId}/>
          {likes.length} {t('LIKES')}
        </div>
        <div className="card__statistics-item">
          <CommentsIcon/>
          {comments} {t('COMMENTS')}
        </div>
      </div>
    </div>
  );
}
