import React, { Dispatch, SetStateAction } from 'react';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ERROR_MESSAGES from '../../../constants/errorMessages';
import { EMAILREGEX } from '../../../constants/regex';
import ROUTES from '../../../constants/routes';
import { IAuthRequestBody, ISignUpForm } from '../../../interfaces';

import './index.scss';

type SignUpFormProps = {
  signUp: (data: IAuthRequestBody) => Promise<void>;
  setIsRedirected: Dispatch<SetStateAction<boolean>>;
};

const validate = (values: ISignUpForm) => {
  const errors = {} as ISignUpForm;

  if (!values.email) {
    errors.email = ERROR_MESSAGES.REQUIRED;
  }

  if (values.email) {
    if (!values.email.match(EMAILREGEX)) {
      errors.email = ERROR_MESSAGES.EMAIL;
    }
  }

  if (!values.password) {
    errors.password = ERROR_MESSAGES.REQUIRED;
  }
  if (!values.confirm) {
    errors.confirm = ERROR_MESSAGES.REQUIRED;
  } else if (values.confirm !== values.password) {
    errors.confirm = ERROR_MESSAGES.CONFIRM;
  }

  if (values.password) {
    if (values.password.length < 7) {
      errors.password = ERROR_MESSAGES.SHORT_LENGTH;
    }

    if (values.password.length > 30) {
      errors.password = ERROR_MESSAGES.LONG_LENGTH;
    }
  }
  return errors;
};

export default function SignUpForm(props: SignUpFormProps): JSX.Element {
  const { signUp, setIsRedirected } = props;
  const { t } = useTranslation();

  const formData = {};

  const onSubmit = (_values: ISignUpForm) => {
    signUp({
      email: _values.email,
      password: _values.password,
    });
    setIsRedirected(true);
  };

  return (
    <div className="sign-up-page__form">
      <Link to="/">
        <div className="form__logo"></div>
      </Link>
      <h1 className="form__title">{t('JOIN')}</h1>
      <h2 className="form__title_small">
        {t('ALREADY_HAVE_ACOOUNT')}
        <Link to={ROUTES.LOG_IN}> {t('SIGN_IN')}</Link>
      </h2>

      <Form
        onSubmit={onSubmit}
        initialValues={formData}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Field name="email">
              {({ input, meta }) => (
                <>
                  <label className="form__label">{t('EMAIL')}</label>
                  <input {...input} type="text" className="form__input" />
                  <span className="form__error">
                    {meta.error && meta.touched ? meta.error : null}
                  </span>
                </>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <>
                  <label className="form__label password">
                    {t('PASSWORD')}
                  </label>
                  <input {...input} type="password" className="form__input" />
                  <span className="form__error">
                    {meta.error && meta.touched ? meta.error : null}
                  </span>
                </>
              )}
            </Field>
            <Field name="confirm">
              {({ input, meta }) => (
                <>
                  <label className="form__label">{t('CONFIRM_PASSWORD')}</label>
                  <input {...input} type="password" className="form__input" />
                  <span className="form__error">
                    {meta.error && meta.touched ? meta.error : null}
                  </span>
                </>
              )}
            </Field>
            <button type="submit" className="form__input submit">
              {t('SIGN_UP')}
            </button>
          </form>
        )}
      />
    </div>
  );
}
