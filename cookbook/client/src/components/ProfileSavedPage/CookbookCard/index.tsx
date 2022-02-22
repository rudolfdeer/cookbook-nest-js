import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import SERVER_URL from '../../../constants/serverUrl';
import { ICookbookComment, ICookbookLike, IUser } from '../../../interfaces';
import CommentsIcon from '../../svg/Comments';
import DotsIcon from '../../svg/Dots';
import LikesIcon from '../../svg/Likes';
import ViewsIcon from '../../svg/Views';

import './index.scss';

type ProfileSavedCookbookCardProps = {
  id: number;
  title: string;
  author: IUser;
  description: string;
  views: number;
  likes: ICookbookLike[];
  image: string;
  comments: ICookbookComment[];
  loggedInUserId: number;
  setCookbookPopUpVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedCookbookId: Dispatch<SetStateAction<number>>;
};

export default function ProfileSavedCookbookCard(
  props: ProfileSavedCookbookCardProps,
): JSX.Element {
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
    setCookbookPopUpVisible,
    setSelectedCookbookId,
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
        <div
          className="card__image"
          style={{
            background: `url(${SERVER_URL}/${image}) center no-repeat`,
          }}
        ></div>
      </div>

      <div className="card__info-container">
        <div
          className="card__title"
          onClick={() => {
            setSelectedCookbookId(id);
            setCookbookPopUpVisible(true);
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
        <div className="card__statistics-item">
          <LikesIcon likeUserIds = {likeUserIds} loggedInUserId={loggedInUserId} id = {id}/>
          {likes.length} {t('LIKES')}
        </div>
        <div className="card__statistics-item">
          <CommentsIcon commentedUsersIds={commentedUsersIds} loggedInUserId={loggedInUserId}/>
          {comments.length} {t('COMMENTS')}
        </div>
      </div>
    </div>
  );
}
