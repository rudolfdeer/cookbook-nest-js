import React from 'react';
import { useTranslation } from 'react-i18next';
import SERVER_URL from '../../../../constants/serverUrl';
import { IRecipeLike, IUser } from '../../../../interfaces';
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
  comments: number;
  id: number;
  loggedInUserId: number;
};

export default function PopUpRecipeCard(
  props: PopUpRecipeCardProps,
): JSX.Element {
  const { t } = useTranslation();
  const {
    views, image, description, title, author, likes, comments, loggedInUserId,
  } = props;

  const likeUserIds = likes.map((el) => el.UserId);

  return (
    <div className="card">
      <div
        className="card__image"
        style={{ background: `url(${SERVER_URL}/${image}) center no-repeat` }}
      ></div>
      <div className="card__content">
        <div className="card__info-container">
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
              {views} <span>&nbsp;{t('VIEWS')}</span>
            </div>
            <div className="card__statistics-item likes">
              <LikesIcon likeUserIds = {likeUserIds} loggedInUserId={loggedInUserId}/>
              {likes.length} <span>&nbsp;{t('LIKES')}</span>
            </div>
            <div className="card__statistics-item comments">
              <CommentsIcon/>
              {comments} <span>&nbsp;{t('COMMENTS')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
