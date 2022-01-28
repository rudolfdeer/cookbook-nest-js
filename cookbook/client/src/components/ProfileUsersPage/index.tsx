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

type ProfileUsersPageProps = {
  cookbooks: ICookbook[];
  getUsersCreatedCookbooks: (userId: number) => void;
  loggedInUserId: number;
};

export default function ProfileUsersPage(
  props: ProfileUsersPageProps,
): JSX.Element {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const { cookbooks, loggedInUserId, getUsersCreatedCookbooks } = props;
  const [user, setUser] = useState(null as IUser);
  const [isPopUpCookbookVisible, setPopUpCookbookVisible] = useState(false);
  const [selectedCookbookId, setSelectedCookbookId] = useState(0);
  const photoSrc = user ? `${SERVER_URL}/${user.image}` : '../../assets/images/photo-mask.png';

  useEffect(() => getUsersCreatedCookbooks(+userId), [userId]);

  useEffect(() => {
    (async () => {
      const response = await userApi.getUserById(+userId);
      setUser(response);
    })();
  }, []);

  if (+userId === loggedInUserId) {
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
                alt="User photo"
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
                author={el.User}
                views={el.views}
                likes={el.Cookbook_Likes}
                comments={el.Cookbook_Comments}
                image={el.image}
                description={el.description}
                key={el.id}
                setSelectedCookbookId={setSelectedCookbookId}
                loggedInUserId={loggedInUserId}
                setPopUpCookbookVisible={setPopUpCookbookVisible}
              />
            ))}
          </section>
          {isPopUpCookbookVisible ? (
            <PopUpCookbook
              setPopUpCookbookVisible={setPopUpCookbookVisible}
              cookbook={cookbooks.find((el) => el.id === selectedCookbookId)}
              loggedInUserId={loggedInUserId}
            />
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
