import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import Footer from '../Footer';
import CookbookCard from './Card';
import FilterPanelCookbooks from './FilterPanel';
import PopUpCookbookDetailed from './PopUp';
import HeaderConnect from '../../redux/containers/HeaderConnect';
import { ICookbook, IRecipe } from '../../interfaces';

import './index.scss';

type CookbooksPageProps = {
  cookbooks: ICookbook[];
  getAllCookbooks: () => Promise<void>;
  recipes: IRecipe[];
  getAllRecipes: () => Promise<void>;
  getLoggedInUser: () => Promise<void>;
  sortCookbooks: (order: string) => Promise<void>;
  filterCookbooks: (tags: string[], userId: number) => Promise<void>;
  saveToUsersCookbooks: (cookbookId: number) => Promise<void>;
  saveToUsersRecipes: (recipeId: number) => Promise<void>;
  loggedInUserId: number;
  createComment: (cookbookId: number, text: string) => Promise<void>;
  likeCookbook: (cookbookId: number) => Promise<void>;
};

export default function CookbooksPage(props: CookbooksPageProps): JSX.Element {
  const { t } = useTranslation();
  const {
    cookbooks,
    getAllCookbooks,
    getAllRecipes,
    sortCookbooks,
    filterCookbooks,
    loggedInUserId,
    saveToUsersCookbooks,
    saveToUsersRecipes,
    createComment,
    getLoggedInUser,
    likeCookbook,
  } = props;

  const [isVisible, setVisible] = useState(false);
  const [chosenCardId, setChosenCardId] = useState(0);
  const [offset, setOffset] = useState(9);
  const [perPage] = useState(9);
  const [pageCount, setPageCount] = useState(1);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getAllRecipes();
    getAllCookbooks();
    getLoggedInUser();
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(cookbooks.length / perPage));
    setCards(cookbooks.slice(offset - perPage, offset));
  }, [offset, cookbooks]);

  const handlePageClick = (e: {
    selected: number;
  }) => {
    const selectedPage = e.selected;
    setOffset((selectedPage + 1) * perPage);
  };

  return (
    <>
      <div className="wrapper">
        <HeaderConnect />
      </div>
      <main className="search-page">
        <div className="search-page__wrapper">
          <aside className="search-page__aside">
            <div className="search-page__aside__container">
              <FilterPanelCookbooks
                sortCookbooks={sortCookbooks}
                filterCookbooks={filterCookbooks}
                loggedInUserId={loggedInUserId}
              />
            </div>
          </aside>
          <div className="search-page__content">
            <nav className="search-page__nav">
              <ul className="search-page__nav__list">
                <li className="list__item--selected">{t('COOKBOOKS')}</li>
                <li className="list__item">
                  <Link to="/recipes">{t('RECIPES')}</Link>
                </li>
              </ul>
            </nav>
            <div className="search-page__cards--cookbooks">
              {cards.map((el) => (
                <CookbookCard
                  id={el.id}
                  title={el.title}
                  author={el.User}
                  views={el.views}
                  likes={el.Cookbook_Likes}
                  comments={el.Cookbook_Comments}
                  image={el.image}
                  description={el.description}
                  key={el.id}
                  selectCard={setChosenCardId}
                  openDetailedInfo={setVisible}
                  likeCookbook={likeCookbook}
                  loggedInUserId={loggedInUserId}
                />
              ))}
            </div>
            <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
          {isVisible ? (
            <PopUpCookbookDetailed
              setVisible={setVisible}
              cookbook={cookbooks.find((el) => el.id === chosenCardId)}
              loggedInUserId={loggedInUserId}
              saveToUsersCookbooks={saveToUsersCookbooks}
              saveToUsersRecipes={saveToUsersRecipes}
              createComment={createComment}
            />
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
