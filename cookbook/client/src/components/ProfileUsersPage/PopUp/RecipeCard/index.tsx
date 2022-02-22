import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import SERVER_URL from '../../../../constants/serverUrl';
import { IUser } from '../../../../interfaces';
import CommentsIcon from '../../../svg/Comments';
import LikesIcon from '../../../svg/Likes';
import ViewsIcon from '../../../svg/Views';
import './index.scss';

type PopUpRecipeCardProps = {
  title: string;
  author: IUser;
  description: string;
  views: number;
  likes: number;
  image: string;
  comments: number;
  setPopUpCookbookVisible: Dispatch<SetStateAction<boolean>>;
};

export default function PopUpRecipeCard(
  props: PopUpRecipeCardProps,
): JSX.Element {
  const { t } = useTranslation();
  const {
    views, image, description, title, author, likes, comments,
  } = props;

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
              {views} {t('VIEWS')}
            </div>
            <div className="card__statistics-item likes">
              <LikesIcon />
              {likes} {t('LIKES')}
            </div>
            <div className="card__statistics-item comments">
              <CommentsIcon />
              {comments} {t('COMMENTS')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
