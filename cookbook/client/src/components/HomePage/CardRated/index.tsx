import React from 'react';
import { useTranslation } from 'react-i18next';
import SERVER_URL from '../../../constants/serverUrl';
import { IRecipeComment, IRecipeLike, IUser } from '../../../interfaces';
import CommentsIcon from '../../svg/Comments';
import DotsIcon from '../../svg/Dots';
import LikesIcon from '../../svg/Likes';
import ViewsIcon from '../../svg/Views';

import './index.scss';

type RecipeCardRatedProps = {
  id: number;
  title: string;
  author: IUser;
  views: number;
  likes: IRecipeLike[];
  image: string;
  comments: IRecipeComment[];
  loggedInuserId: number;
};

export default function CardRated(props: RecipeCardRatedProps): JSX.Element {
  const { id, views, image, title, author, likes, comments, loggedInuserId } =
    props;
  const { t } = useTranslation();

  const likeuserIds = likes.map((el) => el.userId);
  const commentedusersIds = comments.map((el) => el.userId);

  return (
    <div className="card">
      <div className="card__info-container--top">
        <div className="card__statistics-item">
          <ViewsIcon />
          {views} {t('VIEWS')}
        </div>
        <DotsIcon />
      </div>
      <div className="card__image">
        <img src={`${SERVER_URL}/${image}`} alt="Recipe image" />
      </div>
      <div className="card__info-container--middle">
        <div className="card__title">{title}</div>
        <div className="card__author">{author.name}</div>
      </div>
      <div className="card__info-container--bottom">
        <div className="card__statistics-item">
          <LikesIcon
            likeuserIds={likeuserIds}
            loggedInuserId={loggedInuserId}
            id={id}
          />
          {likes.length} {t('LIKES')}
        </div>
        <div className="card__statistics-item">
          <CommentsIcon
            commentedusersIds={commentedusersIds}
            loggedInuserId={loggedInuserId}
          />
          {comments.length} {t('COMMENTS')}
        </div>
      </div>
    </div>
  );
}
