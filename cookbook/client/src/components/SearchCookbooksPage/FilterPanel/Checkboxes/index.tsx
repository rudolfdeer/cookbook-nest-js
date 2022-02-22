import React from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

type CheckboxProps = {
  value: string;
  filter: (e: React.MouseEvent) => void;
};

export default function Checkbox(props: CheckboxProps): JSX.Element {
  const { value, filter } = props;
  const { t } = useTranslation();

  return (
    <div className="filter-panel__section__checkboxes__checkbox">
            <input
              type="checkbox"
              className="filter-panel__section__checkboxes__checkbox__input"
              id={value}
              name={value}
              value={value}
              onClick={(e) => filter(e)}
            />
            <label
              htmlFor={value}
              className="filter-panel__section__checkboxes__checkbox__label"
            >
              {t(`${value.toUpperCase().replace(/\s/g, '_')}`)}
            </label>
          </div>
  );
}
