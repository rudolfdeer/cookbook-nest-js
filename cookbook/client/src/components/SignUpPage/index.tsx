import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import { IAuthRequestBody } from '../../interfaces';
import SignUpForm from './Form';

import './index.scss';

type SignUpPageProps = {
  signUp: (data: IAuthRequestBody) => Promise<void>;
};

export default function SignUpPage(props: SignUpPageProps): JSX.Element {
  const { signUp } = props;
  const [isRedirected, setIsRedirected] = useState(false);

  if (isRedirected) {
    return <Redirect to={ROUTES.PROFILE_SETTINGS} />;
  }

  return (
    <main className="sign-up-page">
      <div className="sign-up-page__wrapper">
        <SignUpForm signUp={signUp} setIsRedirected={setIsRedirected} />
      </div>
    </main>
  );
}
