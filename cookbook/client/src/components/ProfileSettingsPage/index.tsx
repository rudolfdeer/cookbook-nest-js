import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../constants/routes';
import Footer from '../Footer';
import HeaderConnect from '../../redux/containers/HeaderConnect';
import { IUser, IUserRequestBody } from '../../interfaces';
import SERVER_URL from '../../constants/serverUrl';

import './index.scss';

type ProfileSettingsPageProps = {
  user: IUser;
  deleteUser: () => Promise<void>;
  updateUser: (data: IUserRequestBody) => Promise<void>;
  changePassword: (password: string) => Promise<void>;
  changeEmail: (email: string) => Promise<void>;
  updateUsersPhoto: (data: FormData) => Promise<void>;
  signOut: () => Promise<void>;
};

export default function ProfileSettingsPage(
  props: ProfileSettingsPageProps,
): JSX.Element {
  if (!props.user) {
    return <Redirect to={ROUTES.HOME} />;
  }

  const { t } = useTranslation();

  const {
    user,
    deleteUser,
    updateUser,
    changePassword,
    changeEmail,
    signOut,
    updateUsersPhoto,
  } = props;
  const {
    name, email, bio, image,
  } = user;

  const [isBioDisabled, setBioDisabled] = useState(true);
  const [isNameDisabled, setNameDisabled] = useState(true);
  const [isEmailDisabled, setEmailDisabled] = useState(true);
  const [isPasswordDisabled, setPasswordDisabled] = useState(true);
  const [newBio, setNewBio] = useState(bio);
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState('');
  const [photoSrc, setPhotoSrc] = useState(
    `${SERVER_URL}/${image}` || './assets/images/photo-mask.png',
  );

  const onPhotoChange = async (e: React.FormEvent) => {
    const input = e.target as HTMLInputElement;
    const file = input.files[0];

    const data = new FormData();
    data.append('photo', file);
    await updateUsersPhoto(data);

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      setPhotoSrc(result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="wrapper">
        <HeaderConnect />
      </div>
      <main className="profile-page--settings">
        <div className="wrapper">
          <section className="profile-page--settings__content">
            <div className="profile-page--settings__photo--editable">
              <label
                htmlFor="avatar"
                className="profile-page--settings__photo__label"
              >
                <input
                  type="file"
                  className="profile-page--settings__photo__input"
                  name="photo"
                  onChange={(e) => onPhotoChange(e)}
                />
                <img
                  src={photoSrc}
                  alt="User photo"
                  className="profile-page--settings__photo__image--opacity"
                />
              </label>
            </div>
            <div className="profile-page--settings__user editable">
              <div className="profile-page--settings__user__name">
                {newName}
              </div>
              <form action="" className="profile-page--settings__user__form">
                <textarea
                  name="bio"
                  value={newBio}
                  className="profile-page--settings__user__bio--editable"
                  disabled={isBioDisabled}
                  onChange={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    setNewBio(target.value);
                  }}
                />
                {isBioDisabled ? (
                  <button
                    className="profile-page--settings__user__form__input--submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setBioDisabled(false);
                    }}
                  >
                    {t('EDIT_BTN')}
                  </button>
                ) : (
                  <input
                    type="submit"
                    className="profile-page--settings__user__form__input--submit"
                    value={t('SAVE_BTN') as string}
                    onClick={(e) => {
                      e.preventDefault();
                      setBioDisabled(true);
                      updateUser({
                        name: newName,
                        bio: newBio,
                      });
                    }}
                  />
                )}
              </form>
            </div>
          </section>
          <nav className="profile-page--settings__nav">
            <ul className="nav__list">
              <li className="list__item">
                <Link to={ROUTES.PROFILE_SAVED}>{t('SAVED')}</Link>
              </li>
              <li className="list__item">
                <Link to={ROUTES.PROFILE_COOKBOOKS}>{t('MY_COOKBOOKS')}</Link>
              </li>
              <li className="list__item">
                <Link to={ROUTES.PROFILE_RECIPES}>{t('MY_RECIPES')}</Link>
              </li>
              <li className="list__item--selected">{t('MY_SETTINGS')}</li>
            </ul>
          </nav>
          <section className="profile-page--settings__info">
            <div className="profile-page--settings__info__title">
              {t('PERSONAL_INFORMATION')}
            </div>
            <form action="" className="profile-page--settings__info__form">
              <label
                htmlFor="name"
                className="profile-page--settings__info__form__label"
              >
                {t('NAME')}
              </label>
              <input
                type="text"
                name="name"
                value={newName}
                className="profile-page--settings__info__form__input"
                disabled={isNameDisabled}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  setNewName(target.value);
                }}
              />
              {isNameDisabled ? (
                <input
                  type="submit"
                  className="profile-page--settings__user__form__input--submit"
                  value={t('EDIT_BTN') as string}
                  onClick={(e) => {
                    e.preventDefault();
                    setNameDisabled(false);
                  }}
                />
              ) : (
                <input
                  type="submit"
                  className="profile-page--settings__user__form__input--submit"
                  value={t('SAVE_BTN') as string}
                  onClick={(e) => {
                    e.preventDefault();
                    setNameDisabled(true);
                    updateUser({
                      name: newName,
                      photo: photoSrc,
                      bio: newBio,
                    });
                  }}
                />
              )}
            </form>
            <form action="" className="profile-page--settings__info__form">
              <label
                htmlFor="email"
                className="profile-page--settings__info__form__label"
              >
                {t('EMAIL')}
              </label>
              <input
                type="text"
                name="email"
                value={newEmail}
                className="profile-page--settings__info__form__input"
                disabled={isEmailDisabled}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  setNewEmail(target.value);
                }}
              />
              {isEmailDisabled ? (
                <input
                  type="submit"
                  className="profile-page--settings__user__form__input--submit"
                  value={t('EDIT_BTN') as string}
                  onClick={(e) => {
                    e.preventDefault();
                    setEmailDisabled(false);
                  }}
                />
              ) : (
                <input
                  type="submit"
                  className="profile-page--settings__user__form__input--submit"
                  value={t('SAVE_BTN') as string}
                  onClick={(e) => {
                    e.preventDefault();
                    setEmailDisabled(true);
                    changeEmail(newEmail);
                  }}
                />
              )}
            </form>
            <form action="" className="profile-page--settings__info__form">
              <label
                htmlFor="password"
                className="profile-page--settings__info__form__label"
              >
                {t('PASSWORD')}
              </label>
              <input
                type="password"
                name="password"
                value={newPassword}
                className="profile-page--settings__info__form__input"
                disabled={isPasswordDisabled}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  setNewPassword(target.value);
                }}
              />
              {isPasswordDisabled ? (
                <input
                  type="submit"
                  className="profile-page--settings__user__form__input--submit"
                  value={t('EDIT_BTN') as string}
                  onClick={(e) => {
                    e.preventDefault();
                    setPasswordDisabled(false);
                  }}
                />
              ) : (
                <input
                  type="submit"
                  className="profile-page--settings__user__form__input--submit"
                  value={t('SAVE_BTN') as string}
                  onClick={(e) => {
                    e.preventDefault();
                    setPasswordDisabled(true);
                    changePassword(newPassword);
                  }}
                />
              )}
            </form>
            <div className="profile-page--settings__btns">
              <button
                className="profile-page--settings__btns__btn--logout"
                onClick={() => {
                  signOut();
                }}
              >
                {t('LOG_OUT_BTN')}
              </button>
              <button
                className="profile-page--settings__btns__btn--delete"
                onClick={() => {
                  deleteUser();
                }}
              >
                {t('DELETE_ACCOUNT_BTN')}
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
