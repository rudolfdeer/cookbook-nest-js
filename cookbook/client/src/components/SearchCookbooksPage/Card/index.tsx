import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import SERVER_URL from '../../../constants/serverUrl';
import { ICookbookComment, ICookbookLike, IUser } from '../../../interfaces';
import CommentsIcon from '../../svg/Comments';
import DotsIcon from '../../svg/Dots';
import LikesIcon from '../../svg/Likes';
import ViewsIcon from '../../svg/Views';

import './index.scss';

type CookbookCardProps = {
  id: number;
  title: string;
  author: IUser;
  description: string;
  views: number;
  image: string;
  comments: ICookbookComment[];
  likes: ICookbookLike[];
  selectCard: Dispatch<SetStateAction<number>>;
  openDetailedInfo: Dispatch<SetStateAction<boolean>>;
  loggedInUserId: number;
  likeCookbook: (cookbookId: number) => Promise<void>;
};

export default function CookbookCard(props: CookbookCardProps): JSX.Element {
  const { t } = useTranslation();
  const {
    id,
    views,
    image,
    description,
    title,
    author,
    likes,
    comments,
    openDetailedInfo,
    selectCard,
    likeCookbook,
    loggedInUserId,
  } = props;

  const likeUserIds = likes.map((el) => el.UserId);
  const commentedUsersIds = comments.map((el) => el.UserId);

  return (
    <div className="card">
      <div className="card__info-container top">
        <div className="card__statistics-item">
          <ViewsIcon />
          {views} {t('VIEWS')}
        </div>
        <DotsIcon />
      </div>
      <div className="card__info-container">
        <div className="card__image">
          <img src={`${SERVER_URL}/${image}`} alt="Cookbook image" />
        </div>
      </div>
      <div className="card__info-container">
        <div
          className="card__title"
          onClick={() => {
            selectCard(id);
            openDetailedInfo(true);
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
        <div className="card__statistics-item--likes">
          <LikesIcon
            id={id}
            likeCookbook={likeCookbook}
            likeUserIds={likeUserIds}
            loggedInUserId={loggedInUserId}
          />
          {likes.length} {t('LIKES')}
        </div>
        <div className="card__statistics-item">
          <CommentsIcon
            commentedUsersIds={commentedUsersIds}
            loggedInUserId={loggedInUserId}
          />
          {comments.length} {t('COMMENTS')}
        </div>
      </div>
    </div>
  );
}
