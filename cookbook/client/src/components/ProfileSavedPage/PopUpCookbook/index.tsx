import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { ICookbook } from '../../../interfaces';
import CommentsIcon from '../../svg/Comments';
import LikesIcon from '../../svg/Likes';
import PopUpRecipeCard from './RecipeCard';

import './index.scss';
import SERVER_URL from '../../../constants/serverUrl';

type PopUpCookbookDetailedProps = {
  setCookbookPopUpVisible: Dispatch<SetStateAction<boolean>>;
  cookbook: ICookbook;
  loggedInUserId: number;
};

export default function PopUpCookbookSaved(
  props: PopUpCookbookDetailedProps,
): JSX.Element {
  const { t } = useTranslation();
  const { setCookbookPopUpVisible, cookbook, loggedInUserId } = props;

  const {
    image, description, title, User, Cookbook_Likes, Cookbook_Comments, Recipe_Cookbooks,
  } = cookbook;

  function closePopUp(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains('overlay')
      || target.classList.contains('overlay__btn')
    ) {
      setCookbookPopUpVisible(false);
    }
  }

  const recipes = Recipe_Cookbooks.map((el) => el.Recipe);
  const likeUserIds = Cookbook_Likes.map((el) => el.UserId);

  return (
    <div className="overlay" onClick={(e) => closePopUp(e)}>
      <div className="overlay__content--cookbook">
        <div className="pop-up--cookbook">
          <div className="pop-up--cookbook__section--top">
            <div className="pop-up--cookbook__title">{title}</div>
          </div>

          <div className="pop-up--cookbook__author">
            {User.name}
          </div>
          <div className="pop-up--cookbook__section--description">
            <div
              className="pop-up--cookbook__image"
              style={{
                background: `url(${SERVER_URL}/${image}) center no-repeat`,
              }}
            ></div>
            <div className="pop-up--cookbook__section--description__text">
              <div className="pop-up--cookbook__section__title">
                {t('DESCRIPTION')}
              </div>
              <p>{description}</p>
            </div>
          </div>
          <div className="pop-up--cookbook__section--statistics">
            <div className="card__statistics-item likes">
              <LikesIcon likeUserIds = {likeUserIds} loggedInUserId={loggedInUserId}/>
              {Cookbook_Likes.length} <span>&nbsp;{t('LIKES')}</span>
            </div>
            <div className="card__statistics-item comments">
              <CommentsIcon/>
              {Cookbook_Comments.length} <span>&nbsp;{t('COMMENTS')}</span>
            </div>
          </div>
          <div className="pop-up--cookbook__section--recipes">
            <div className="pop-up--cookbook__section__title">
              {t('RECIPES')}
            </div>
            <div className="pop-up--cookbook__section--recipes__cards">
              {recipes?.map((el) => (
                <PopUpRecipeCard
                  title={el.title}
                  author={el.User}
                  views={el.views}
                  description={el.description}
                  likes={el.Recipe_Likes}
                  image={el.image}
                  comments={el.Recipe_Comments?.length}
                  key={el.id}
                  id={el.id}
                  loggedInUserId={loggedInUserId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
