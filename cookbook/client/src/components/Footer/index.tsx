import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../constants/routes';

import './index.scss';

export default function Footer(): JSX.Element {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    i18n.changeLanguage(target.value);
    localStorage.setItem('lang', target.value);
  };

  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer__container">
          <Link to={ROUTES.HOME}>
            <div className="footer__logo" />
          </Link>
          <nav className="footer__nav">
            <ul className="footer__nav__list">
              <li className="footer__nav__list__item">
                <Link to={ROUTES.COOKBOOKS}>{t('COOKBOOKS')}</Link>
              </li>
              <li className="footer__nav__list__item">
                <Link to={ROUTES.RECIPES}>{t('RECIPES')}</Link>
              </li>
              <li className="footer__nav__list__item">
                <Link to="/">{t('ABOUT_US')}</Link>
              </li>
            </ul>
          </nav>
          <div className="footer__email">
            <a href={`mailto:${t('MY_EMAIL')}`}>{t('MY_EMAIL')}</a>
          </div>
          <div className="footer__study">
            <div className="footer__study__project">{t('PROJECT')}</div>
            <div className="footer__study__itechart">
              <a href={t('ITECHART_SITE')}>{t('ITECHART')}</a>
            </div>
          </div>
          <div className="footer__lang">
            <button
              className="footer__lang__btn"
              value="en"
              onClick={(e) => changeLanguage(e)}
            >
              English
            </button>
            <button
              className="footer__lang__btn"
              value="fr"
              onClick={(e) => changeLanguage(e)}
            >
              Français
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
