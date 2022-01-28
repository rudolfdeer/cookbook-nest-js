import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SERVER_URL from '../../../constants/serverUrl';
import { IRecipe, IRecipeRequestBody } from '../../../interfaces';

import './index.scss';

type PopUpModifyRecipeProps = {
  setModifyPopUpVisible: Dispatch<SetStateAction<boolean>>;
  selectedRecipe: IRecipe;
  modifyRecipe: (
    recipeId: number,
    data: IRecipeRequestBody,
    userId: number
  ) => Promise<void>;
  updateRecipesImage: (
    recipeId: number,
    data: FormData,
    userId: number
  ) => Promise<void>;
  loggedInUserId: number;
};

export default function PopUpModifyRecipe(
  props: PopUpModifyRecipeProps,
): JSX.Element {
  const {
    setModifyPopUpVisible,
    selectedRecipe,
    modifyRecipe,
    loggedInUserId,
    updateRecipesImage,
  } = props;

  const { t } = useTranslation();

  const {
    id, title, image, description, directions, ingredients, views, Recipe_Likes,
  } = selectedRecipe;

  const [imageSrc, setImageSrc] = useState(`${SERVER_URL}/${image}`);
  const [isTitleDisabled, setTitleDisabled] = useState(true);
  const [newTitle, setNewTitle] = useState(title);
  const [isDescriptionDisabled, setDescriptionDisabled] = useState(true);
  const [newDescription, setNewDescription] = useState(description);
  const [isDirectionsDisabled, setDirectionsDisabled] = useState(true);
  const [newDirections, setNewDirections] = useState(directions);
  const [isIngredientsDisabled, setIngredientsDisabled] = useState(true);
  const [newIngredients, setNewIngredients] = useState(ingredients);

  const closePopUp = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('overlay')) {
      setModifyPopUpVisible(false);
    }
  };

  const onImageChange = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files[0];

    const data = new FormData();
    data.append('image', file);
    await updateRecipesImage(id, data, loggedInUserId);

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      setImageSrc(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="overlay" onClick={(e) => closePopUp(e)}>
      <div className="overlay__content--row">
        <div className="pop-up--modify">
          <div className="pop-up--modify__image">
            <input
              type="file"
              className="pop-up--modify__input--file"
              onChange={(e) => onImageChange(e)}
            />
            {<img src={imageSrc} alt="" className="img" />}
          </div>
          <div className="pop-up--modify__sections">
            <div className="pop-up--modify__section--top">
              <textarea
                className="pop-up--modify__section__title--editable"
                name="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                disabled={isTitleDisabled}
              />
              {isTitleDisabled ? (
                <button
                  className="pop-up--modify__section__btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setTitleDisabled(false);
                  }}
                >
                  {t('EDIT_BTN')}
                </button>
              ) : (
                <button
                  className="pop-up--modify__section__btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setTitleDisabled(true);
                  }}
                >
                  {t('SAVE_BTN')}
                </button>
              )}
            </div>

            <div className="pop-up--modify__section--description--recipe">
              <textarea
                className="pop-up--modify__input--textarea"
                value={newDescription}
                disabled={isDescriptionDisabled}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              {isDescriptionDisabled ? (
                <button
                  className="pop-up--modify__section__btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setDescriptionDisabled(false);
                  }}
                >
                  {t('EDIT_BTN')}
                </button>
              ) : (
                <button
                  className="pop-up--modify__section__btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setDescriptionDisabled(true);
                  }}
                >
                  {t('SAVE_BTN')}
                </button>
              )}
            </div>
            <div className="pop-up--modify__section">
              <div className="pop-up--modify__section__container">
                <div className="pop-up--modify__section--top">
                  <div className="pop-up--modify__section__title">
                    {t('DIRECTIONS')}
                  </div>
                  {isDirectionsDisabled ? (
                    <button
                      className="pop-up--modify__section__btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setDirectionsDisabled(false);
                      }}
                    >
                      {t('EDIT_BTN')}
                    </button>
                  ) : (
                    <button
                      className="pop-up--modify__section__btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setDirectionsDisabled(true);
                      }}
                    >
                      {t('SAVE_BTN')}
                    </button>
                  )}
                </div>
                <textarea
                  className="pop-up--modify__input--textarea"
                  value={newDirections}
                  disabled={isDirectionsDisabled}
                  onChange={(e) => setNewDirections(e.target.value.split(','))}
                />
              </div>
              <div className="pop-up--modify__section__container">
                <div className="pop-up--modify__section--top">
                  <div className="pop-up--modify__section__title">
                    {t('INGREDIENTS')}
                  </div>
                  {isIngredientsDisabled ? (
                    <button
                      className="pop-up--modify__section__btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setIngredientsDisabled(false);
                      }}
                    >
                      {t('EDIT_BTN')}
                    </button>
                  ) : (
                    <button
                      className="pop-up--modify__section__btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setIngredientsDisabled(true);
                      }}
                    >
                      {t('SAVE_BTN')}
                    </button>
                  )}
                </div>
                <textarea
                  className="pop-up--modify__input--textarea"
                  value={newIngredients}
                  disabled={isIngredientsDisabled}
                  onChange={(e) => setNewIngredients(e.target.value.split(','))}
                />
              </div>
            </div>
            <div className="pop-up--modify__btns">
              <button
                className="pop-up--modify__btns__btn--light"
                onClick={() => {
                  const data = {
                    title: newTitle,
                    description: newDescription,
                    directions: newDirections.join(','),
                    ingredients: newIngredients.join(','),
                    views,
                    likeUserIds: Recipe_Likes.map((el) => el.UserId),
                  };
                  setModifyPopUpVisible(false);
                  modifyRecipe(id, data, loggedInUserId);
                }}
              >
                {t('SAVE_BTN')}
              </button>
              <button
                className="pop-up--modify__btns__btn"
                onClick={() => setModifyPopUpVisible(false)}
              >
                {t('CANCEL_BTN')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
