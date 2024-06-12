import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './index.scss';

type FilterPanelRecipeProps = {
  sortRecipes: (order: string) => Promise<void>;
  filterRecipes: (cookingTime: number) => Promise<void>;
};

export default function FilterPanelRecipes(
  props: FilterPanelRecipeProps,
): JSX.Element {
  const { t } = useTranslation();
  const { sortRecipes, filterRecipes } = props;
  const [sortOrder, setSortOrder] = useState('');
  const [maxCookingTime, setMaxCookingTime] = useState(240);

  useEffect(() => {
    filterRecipes(maxCookingTime);
  }, [maxCookingTime]);

  useEffect(() => {
    sortRecipes(sortOrder);
  }, [sortOrder]);

  function sort(e: React.ChangeEvent) {
    const target = e.target as HTMLSelectElement;
    setSortOrder(target.value);
  }

  function filter(e: React.ChangeEvent) {
    const target = e.target as HTMLSelectElement;
    setMaxCookingTime(+target.value);
  }

  function clearAllFilters() {
    setMaxCookingTime(240);
    setSortOrder('default');
  }

  return (
    <div className="filter-panel">
      <div className="filter-panel__container">
        <div className="filter-panel__title">{t('FILTER')}</div>
        <button className="filter-panel__btn" onClick={() => clearAllFilters()}>
          {t('CLEAR_ALL_BTN')}
        </button>
      </div>
      <div className="filter-panel__section sort">
        <label className="filter-panel__section__title" htmlFor="sort">
          {t('SORT_BY')}
        </label>
        <select
          name="sort"
          id="sort"
          className="filter-panel__select"
          defaultValue={sortOrder}
          onChange={(e) => sort(e)}
        >
          <option value="" disabled hidden>
            {t('CHOOSE_HERE')}
          </option>
          <option value="views">{t('POPULARITY')}</option>
          <option value="likes">{t('RATING')}</option>
        </select>
      </div>
      <div className="filter-panel__section type">
        <div className="filter-panel__section__title">{t('COOKING_TIME')}</div>
        <div className="filter-panel__range">
          <input
            type="range"
            className="filter-panel__range__input"
            id="time"
            name="time"
            min="0"
            max="60"
            step="5"
            value={maxCookingTime}
            onChange={(e) => filter(e)}
          />
          <div className="filter-panel__range__values">
            <div>{t('1_MIN')}</div>
            <div>
              {'>'}
              {t('1_HOUR')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
