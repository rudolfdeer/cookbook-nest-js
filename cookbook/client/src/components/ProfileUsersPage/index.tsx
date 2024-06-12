import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer';
import CardCookbook from './Card';
import HeaderConnect from '../../redux/containers/HeaderConnect';
import userApi from '../../helpers/api/userApi';
import PopUpCookbook from './PopUp';
import ROUTES from '../../constants/routes';
import { ICookbook, IUser } from '../../interfaces';
import SERVER_URL from '../../constants/serverUrl';

import './index.scss';

type ProfileusersPageProps = {
  cookbooks: ICookbook[];
  getusersCreatedCookbooks: (userId: number) => void;
  loggedInuserId: number;
};

export default function ProfileusersPage(
  props: ProfileusersPageProps
): JSX.Element {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const { cookbooks, loggedInuserId, getusersCreatedCookbooks } = props;
  const [user, setuser] = useState(null as IUser);
  const [isPopUpCookbookVisible, setPopUpCookbookVisible] = useState(false);
  const [selectedCookbookId, setSelectedCookbookId] = useState(0);
  const photoSrc = user
    ? `${SERVER_URL}/${user.image}`
    : '../../assets/images/photo-mask.png';

  useEffect(() => getusersCreatedCookbooks(+userId), [userId]);

  useEffect(() => {
    (async () => {
      const response = await userApi.getuserById(+userId);
      setuser(response);
    })();
  }, []);

  if (+userId === loggedInuserId) {
    return <Redirect to={ROUTES.PROFILE_COOKBOOKS} />;
  }

  return (
    <>
      <div className="wrapper">
        <HeaderConnect />
      </div>
      <main className="profile-page--user">
        <div className="wrapper">
          <section className="profile-page--user__user">
            <div className="profile-page--user__user__photo">
              <img
                src={photoSrc}
                alt="user photo"
                className="profile-page--user__user__photo__image"
              />
            </div>
            <div className="profile-page--user__user__container">
              <div className="profile-page--user__user__name">{user?.name}</div>
              <div className="profile-page--user__user__bio">{user?.bio}</div>
            </div>
          </section>
          <nav className="profile-page--user__nav">
            <ul className="profile-page--user__nav__list">
              <li className="list__item--selected"> {t('CREATED_CB')}</li>
            </ul>
          </nav>
          <section className="profile-page--user__cards">
            {cookbooks?.map((el) => (
              <CardCookbook
                id={el.id}
                title={el.title}
                author={el.user}
                views={el.views}
                likes={el.likes}
                comments={el.comments}
                image={el.image}
                description={el.description}
                key={el.id}
                setSelectedCookbookId={setSelectedCookbookId}
                loggedInuserId={loggedInuserId}
                setPopUpCookbookVisible={setPopUpCookbookVisible}
              />
            ))}
          </section>
          {isPopUpCookbookVisible ? (
            <PopUpCookbook
              setPopUpCookbookVisible={setPopUpCookbookVisible}
              cookbook={cookbooks.find((el) => el.id === selectedCookbookId)}
              loggedInuserId={loggedInuserId}
            />
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
