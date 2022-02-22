import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { EMAILREGEX } from '../../../constants/regex';
import ERROR_MESSAGES from '../../../constants/errorMessages';
import ROUTES from '../../../constants/routes';
import { IAuthRequestBody } from '../../../interfaces';

import './index.scss';

type LogInFormProps = {
  signIn: (loginInfo: IAuthRequestBody) => Promise<void>;
};

type Validator = (value: string) => undefined | string;

const required = (value: string) => (value ? undefined : ERROR_MESSAGES.REQUIRED);
const validEmail = (value: string) => (!value.match(EMAILREGEX) ? ERROR_MESSAGES.EMAIL : undefined);
const composeValidators = (...validators: Validator[]) => (value: string) => validators.reduce(
  (error, validator) => error || validator(value),
  undefined,
);

export default function LogInForm(props: LogInFormProps): JSX.Element {
  const { signIn } = props;
  const { t } = useTranslation();

  const formData = {};

  const onSubmit = (values: IAuthRequestBody) => signIn(values);

  return (
    <div className="log-in-page__form">
      <Link to="/">
        <div className="form__logo"></div>
      </Link>
      <h1 className="form__title">{t('WELCOME')}</h1>
      <h2 className="form__title_small">
        {t('NEW_HERE')} <Link to={ROUTES.SIGN_UP}>{t('CREATE_ACCOUNT')}</Link>
      </h2>
      <Form
        onSubmit={onSubmit}
        initialValues={formData}
        render={({ handleSubmit }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Field
              name="email"
              validate={composeValidators(required, validEmail)}
            >
              {({ input, meta }) => (
                <>
                  <label className="form__label">{t('EMAIL')}</label>
                  <input {...input} type="text" className="form__input" />
                    <span className="form__error email">{meta.error && meta.touched ? meta.error : null}</span>
                </>
              )}
            </Field>
            <Field name="password" validate={required}>
              {({ input, meta }) => (
                <>
                  <label className="form__label password">
                    {t('PASSWORD')}
                    <span>{t('FORGOT_PASSWORD')}</span>
                  </label>
                  <input {...input} type="password" className="form__input" />
                  <span className="form__error email">{meta.error && meta.touched ? meta.error : null}</span>
                </>
              )}
            </Field>
            <button type="submit" className="form__input submit">
              {t('SIGN_IN')}
            </button>
          </form>
        )}
      />
    </div>
  );
}
