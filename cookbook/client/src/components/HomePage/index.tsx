import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../constants/routes';
import HeaderConnect from '../../redux/containers/HeaderConnect';
import Footer from '../Footer';
import CardPopular from './CardPopular';
import CardRated from './CardRated';
import CardTrending from './CardTrending';
import { ICookbook, IRecipe, IUser } from '../../interfaces';

import './index.scss';

type HomePageProps = {
  recipes: IRecipe[];
  getAllRecipes: () => Promise<void>;
  cookbooks: ICookbook[];
  getAllCookbooks: () => Promise<void>;
  user: IUser;
};

export default function HomePage(props: HomePageProps): JSX.Element {
  const {
    recipes, getAllRecipes, cookbooks, getAllCookbooks, user,
  } = props;
  const { t } = useTranslation();

  const navList = t('SEARCH_NAV_LIST', { returnObjects: true }) as string[];

  useEffect(() => {
    getAllRecipes();
    getAllCookbooks();
  }, []);

  return (
    <>
      <div className="wrapper">
        <HeaderConnect />
      </div>
      <main className="page--home">
        <div className="wrapper">
          <img
            src="../../../assets/images/pear-bg.png"
            className="page--home__bg--top"
          />
          <img
            src="../../../assets/images/pear-light-bg.png"
            className="page--home__bg--bottom"
          />
          <div className="page--home__intro">
            <section className="page--home__intro__content">
              <h1 className="page--home__intro__title">{t('MAIN_TITLE')}</h1>
              <div className="page--home__intro__search">
                <div className="page--home__intro__search__icon" />
                <input
                  type="text"
                  className="page--home__intro__search__input"
                  placeholder={t('SEARCH_INPUT_PLACEHOLDER')}
                />
                <button className="page--home__intro__search__btn">
                  {t('SEARCH_BTN')}
                </button>
              </div>
              <nav className="page--home__intro__nav">
                <ul className="page--home__intro__nav__list">
                  {navList.map((el) => (
                    <li
                      className="page--home__intro__nav__list__item"
                      key={navList.indexOf(el)}
                    >
                      {el}
                    </li>
                  ))}
                </ul>
              </nav>
            </section>
          </div>
          <section className="page--home__section--rated">
            <div className="page--home__section--rated__pre-title">
              {t('RATED_SECTION_PRE_TITLE')}
            </div>
            <h2 className="page--home__section--rated__title">
              {t('RATED_SECTION_TITLE')}
            </h2>
            <div className="page--home__section--rated__cards">
              {recipes
                ?.map((el) => (
                  <CardRated
                    id = {el.id}
                    title={el.title}
                    author={el.User}
                    views={el.views}
                    comments={el.Recipe_Comments}
                    image={el.image}
                    key={el.id}
                    likes={el.Recipe_Likes}
                    loggedInUserId = {user?.id}
                  />
                ))
                .slice(0, 4)}
            </div>
            <button className="page--home__section--rated__btn">
              <Link to={ROUTES.RECIPES}>{t('SHOW_MORE_BTN')}</Link>
            </button>
          </section>
          <section className="page--home__section--popular">
            <div className="page--home__section--popular__pre-title">
              {t('POPULAR_SECTION_PRE_TITLE')}
            </div>
            <h2 className="page--home__section--popular__title">
              {t('POPULAR_SECTION_TITLE')}
            </h2>
            <div className="page--home__section--popular__cards">
              {cookbooks
                ?.map((el) => (
                  <CardPopular title={el.title} image={el.image} key={el.id} />
                ))
                .slice(0, 4)}
            </div>
            <button className="page--home__section--popular__btn">
              <Link to={ROUTES.COOKBOOKS}>{t('SHOW_MORE_BTN')}</Link>
            </button>
          </section>
        </div>
        <section className="page--home__section--trending">
          <div className="page--home__section--trending__wrapper">
            <div className="page--home__section--trending__pre-title">
              {t('TRENDING_SECTION_PRE_TITLE')}
            </div>
            <h2 className="page--home__section--trending__title">
              {t('TRENDING_SECTION_TITLE')}
            </h2>
            <div className="page--home__section--trending__slider">
              <div className="page--home__section--trending__cards">
                {recipes
                  ?.map((el) => (
                    <CardTrending
                      title={el.title}
                      author={el.User}
                      views={el.views}
                      image={el.image}
                      key={el.id}
                    />
                  ))
                  .slice(0, 3)}
              </div>
            </div>
            <button className="page--home__section--trending__btn">
              <Link to={ROUTES.RECIPES}>{t('SHOW_ALL_BTN')}</Link>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
