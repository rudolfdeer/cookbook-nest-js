import React from 'react';
import SERVER_URL from '../../../constants/serverUrl';
import DotsIcon from '../../svg/Dots';

import './index.scss';

type CookbookCardProps = {
  title: string;
  image: string;
};

export default function CardPopular(props: CookbookCardProps): JSX.Element {
  const { image, title } = props;

  return (
    <div
      className="card"
    >
      <img
        src={`${SERVER_URL}/${image}`}
        alt="Cookbook image"
      />
      <DotsIcon />
      <div className="card__name">{title}</div>
    </div>
  );
}
