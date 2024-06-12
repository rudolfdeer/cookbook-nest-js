import React, { Dispatch, SetStateAction, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { IRecipeRequestBody } from '../../../interfaces';

import './index.scss';

type PopUpCreateRecipeProps = {
  loggedInUserId: number;
  setCreatePopUpVisible: Dispatch<SetStateAction<boolean>>;
  createRecipe: (
    data: FormData,
    userId: number,
  ) => Promise<void>;
};

const formData = {
  title: '',
  description: [''],
  ingredients: [''],
  directions: [''],
  time: '',
};

const required = (value: string | string[]) => (value ? undefined : 'Required');

export default function PopUpCreateRecipe(
  props: PopUpCreateRecipeProps,
): JSX.Element {
  const { setCreatePopUpVisible, createRecipe, loggedInUserId } = props;

  const { t } = useTranslation();
  const [photoSrc, setPhotoSrc] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  const onSubmit = (values: IRecipeRequestBody) => {
    const data = new FormData();
    data.append('title', values.title);
    data.append('description', values.description);
    data.append('ingredients', values.ingredients);
    data.append('directions', values.directions);
    data.append('time', values.time.toString());
    data.append('image', photoFile);

    createRecipe(data, loggedInUserId);
    setCreatePopUpVisible(false);
  };

  const closePopUp = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('overlay')) {
      setCreatePopUpVisible(false);
    }
  };

  return (
    <div className="overlay" onClick={(e) => closePopUp(e)}>
      <div className="overlay__content">
        <div className="pop-up--create">
          <div className="pop-up--create__title">{t('CREATE_NEW_RECIPE')}</div>
          <Form
            onSubmit={onSubmit}
            initialValues={{ ...formData }}
            render={({ handleSubmit, submitting, pristine }) => (
              <form action="" onSubmit={handleSubmit}>
                <div className="pop-up--create__section">
                  <Field name="title" validate={required}>
                    {({ input, meta }) => (
                      <>
                        <label
                          htmlFor="title"
                          className="pop-up--create__section__title"
                        >
                          {t('RECIPE_TITLE')}
                          <span>*</span>
                        </label>
                        <input
                          {...input}
                          type="text"
                          className="pop-up--create__section__input--error"
                          placeholder="Title"
                        />
                          <span className="pop-up--create__section__input__error">
                            {meta.error && meta.touched ? meta.error : null}
                          </span>
                      </>
                    )}
                  </Field>
                </div>
                <div className="pop-up--create__section--image">
                  <label className="pop-up--create__section__btn">
                    {t('UPLOAD_REC_IMAGE')}
                    <Field name="image">
                      {({ input }) => (
                        <input
                        {...input}
                      name="image"
                      type="file"
                      className="pop-up--create__section__input--file"
                      onChange={(e: React.ChangeEvent) => {
                        const target = e.target as HTMLInputElement;
                        const file = target.files[0];
                        setPhotoFile(file);
                        const reader = new FileReader();
                        reader.onload = () => {
                          const result = String(reader.result);
                          setPhotoSrc(result);
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                      )}
                    </Field>
                  </label>
                  <img
                    src={photoSrc}
                    alt="Image preview"
                    className="pop-up--create__section__preview"
                  />
                </div>
                <div className="pop-up--create__section">
                  <label
                    htmlFor="description"
                    className="pop-up--create__section__title"
                  >
                    {t('DESCRIPTION')}
                  </label>
                  <Field
                    type="text"
                    className="pop-up--create__section__input--big"
                    name="description"
                    placeholder="Description"
                    component="input"
                  />
                </div>
                <div className="pop-up--create__section">
                  <label
                    htmlFor="ingredients"
                    className="pop-up--create__section__title"
                  >
                    {t('INGREDIENTS')}
                  </label>
                  <Field
                    type="text"
                    className="pop-up--create__section__input"
                    name="ingredients"
                    placeholder="Ingredient"
                    component="input"
                  />
                  <div className="ingredients"></div>
                </div>

                <div className="pop-up--create__section">
                  <label
                    htmlFor="directions"
                    className="pop-up--create__section__title"
                  >
                    {t('DIRECTIONS')}
                  </label>
                  <Field
                    type="text"
                    className="pop-up--create__section__input--big"
                    name="directions"
                    placeholder="Directions"
                    component="input"
                  />
                </div>

                <div className="pop-up--create__section">
                  <label
                    htmlFor="time"
                    className="pop-up--create__section__title"
                  >
                    {t('COOKING_TIME')}
                  </label>
                  <Field
                    type="number"
                    className="pop-up--create__section__input"
                    name="time"
                    placeholder={t('COOKING_TIME_MIN')}
                    component="input"
                    min="1"
                    max="60"
                  />
                </div>

                <div className="pop-up--create__btns">
                  <button
                    className="pop-up--create__btns__btn--light"
                    onClick={() => setCreatePopUpVisible(false)}
                  >
                    {t('CANCEL_BTN')}
                  </button>
                  <button
                    type="submit"
                    className="pop-up--create__btns__btn"
                    disabled={submitting || pristine}
                  >
                    {t('CONFIRM_BTN')}
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
}
