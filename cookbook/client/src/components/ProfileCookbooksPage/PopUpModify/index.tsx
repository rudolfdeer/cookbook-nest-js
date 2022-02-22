import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PopUpRecipeCard from './Card';
import { ICookbook, ICookbookRequestBody, IRecipe } from '../../../interfaces';
import SERVER_URL from '../../../constants/serverUrl';

import './index.scss';

type PopUpModifyCookbookProps = {
  recipes: IRecipe[];
  setModifyPopUpVisible: Dispatch<SetStateAction<boolean>>;
  selectedCookbook: ICookbook;
  loggedInUserId: number;
  modifyCookbook: (
    cookbookId: number,
    data: ICookbookRequestBody,
    userId: number
  ) => Promise<void>;
  updateCookbooksImage: (
    cookbookId: number,
    data: FormData,
    userId: number
  ) => Promise<void>;
};

export default function PopUpModifyCookbook(
  props: PopUpModifyCookbookProps,
): JSX.Element {
  const {
    setModifyPopUpVisible,
    selectedCookbook,
    loggedInUserId,
    modifyCookbook,
    updateCookbooksImage,
    recipes,
  } = props;

  const { t } = useTranslation();

  const {
    id, image, description, title, User, Recipe_Cookbooks,
  } = selectedCookbook;
  const recipesIds = Recipe_Cookbooks.map((el) => el.RecipeId);

  const [imageSrc, setImageSrc] = useState(`${SERVER_URL}/${image}`);
  const [isTitleDisabled, setTitleDisabled] = useState(true);
  const [newTitle, setNewTitle] = useState(title);
  const [isDescriptionDisabled, setDescriptionDisabled] = useState(true);
  const [newDescription, setNewDescription] = useState(description);
  const [newRecipesIds, setNewRecipesIds] = useState(recipesIds);

  function closePopUp(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains('overlay')
      || target.classList.contains('overlay__btn')
    ) {
      setModifyPopUpVisible(false);
    }
  }

  const onImageChange = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file = target.files[0];

    const data = new FormData();
    data.append('image', file);

    await updateCookbooksImage(id, data, loggedInUserId);

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      setImageSrc(result);
    };
    reader.readAsDataURL(file);
  };

  const addRecipeToCookbook = (recipeId: number) => {
    if (newRecipesIds.indexOf(recipeId) > -1) {
      return;
    }
    const newIds = newRecipesIds.concat(recipeId);
    setNewRecipesIds(newIds);
  };

  const onSubmit = () => {
    const values = {
      title: newTitle,
      description: newDescription,
      recipesIds: newRecipesIds,
    };
    modifyCookbook(id, values, loggedInUserId);
    setModifyPopUpVisible(false);
  };

  const recipesInCb = Recipe_Cookbooks.map((el) => el.Recipe);
  const recipeIdsInCb = Recipe_Cookbooks.map((el) => el.RecipeId);
  const usersRecipes = recipes.filter((el) => el.UserId === loggedInUserId);

  return (
    <div className="overlay" onClick={(e) => closePopUp(e)}>
      <div className="overlay__content">
        <div className="pop-up--modify--column">
          <div className="pop-up--modify__section--top">
            <input
              type="text"
              className="pop-up--modify__section__title--editable"
              name="title"
              placeholder={newTitle}
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

          <div className="pop-up--modify__author">
            {User.name}
          </div>
          <div className="pop-up--modify__section--description">
            <div
              className="pop-up--modify__image--cookbook"
            ><img
            src={imageSrc}
            alt="Cookbook image"
          />
              <input
                type="file"
                className="pop-up--modify__input--file"
                onChange={(e) => onImageChange(e)}
              />
            </div>
            <div className="pop-up--modify__section--description__container">
              <div className="pop-up--modify__section__title">
                {t('DESCRIPTION')}
              </div>
              <textarea
                name="description"
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
          </div>
          <div className="pop-up--modify__section--recipes">
            <div className="pop-up--modify__section__title">{t('RECIPES')}</div>
            <div className="pop-up--modify__section--recipes__cards">
              {recipesInCb?.map((el) => (
                <PopUpRecipeCard
                  title={el.title}
                  author={el.User}
                  views={el.views}
                  description={el.description}
                  likes={el.Recipe_Likes}
                  image={el.image}
                  comments={el.Recipe_Comments}
                  key={el.id}
                  id={el.id}
                  loggedInUserId={loggedInUserId}
                  setNewRecipesIds={setNewRecipesIds}
                  recipesIds={newRecipesIds}
                />
              ))}
            </div>
          </div>
          <div className="pop-up--modify__section--add">
            <div className="pop-up--modify__section__title">
              {t('ADD_RECIPES')}
            </div>
            <select
              className="pop-up--modify__input--select"
              name="recipes"
              id="recipes"
              onChange={(e) => {
                const select = e.target as HTMLSelectElement;
                addRecipeToCookbook(Number(select.value));
              }}
            >
              {usersRecipes?.map((el) => {
                if (recipeIdsInCb.indexOf(el.id) === -1) {
                  return (
                    <option key={el.id} value={el.id}>
                  {el.title}
                </option>
                  );
                }
                return null;
              })}
            </select>
          </div>
          <div className="pop-up--modify__btns">
            <button
              className="pop-up--modify__btns__btn--light"
              onClick={() => onSubmit()}
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
  );
}
