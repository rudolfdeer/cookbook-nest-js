import React from 'react';
import { useTranslation } from 'react-i18next';
import SERVER_URL from '../../../constants/serverUrl';
import { IUser } from '../../../interfaces';
import DotsIcon from '../../svg/Dots';
import ViewsIcon from '../../svg/Views';

import './index.scss';

type RecipeCardTrendingProps = {
  title: string;
  author: IUser;
  views: number;
  image: string;
};

export default function CardTrending(
  props: RecipeCardTrendingProps,
): JSX.Element {
  const {
    views, image, title, author,
  } = props;
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card__info-container">
        <div className="card__statistics-item">
          <ViewsIcon />
          {views} {t('VIEWS')}
        </div>
        <DotsIcon />
      </div>

      <div
        className="card__image"
      >
        <img
          src={`${SERVER_URL}/${image}`}
          alt="Recipe image"
        />
      </div>
      <div className="card__info-container--bottom">
        <div className="card__title">{title}</div>
        <div className="card__author">{author.name}</div>
      </div>
    </div>
  );
}
