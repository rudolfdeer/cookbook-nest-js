import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../constants/routes';

import './index.scss';

export default function NotFoundPage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <main className="page--not-found">
      <img
        src="../../../assets/images/pear-bg.png"
        className="page--not-found__bg"
      />
      <div className="page--not-found__content">
        <h1 className="page--not-found__title">404</h1>
        <h2 className="page--not-found__title--small">{t('NOT_FOUND')}</h2>
        <p className="page--not-found__text">
          {t('PAGE_NOT_EXIST')} <Link to={ROUTES.HOME}>{t('HOME_PAGE')}</Link>
        </p>
      </div>
    </main>
  );
}
