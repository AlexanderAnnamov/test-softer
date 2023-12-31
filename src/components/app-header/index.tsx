import React from "react";
import { YandexLogout } from "react-yandex-login";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IUser } from "../../models/IUser";
import logoImg from "../../assets/img/softer.png";
import logoutImg from "../../assets/img/logout.svg";
import userImg from "../../assets/img/user.png";

import UserSkeleton from "./user-skeleton";

import styles from "./app-header.module.scss";

type IHeader = {
  logout?: () => void
}

const AppHeader: React.FC<IHeader> = ({ logout }) => {

  const token = useSelector((state: any) => state.auth.oAuthToken);
  const [userId, setUserId] = React.useState<IUser>();

  console.log("user id", userId);

  React.useEffect(() => {
    console.log("Request userId");
    if (token) {
      fetch("https://cloud-api.yandex.net/v1/disk/", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          
          setUserId({name: data?.user?.display_name,
            country: data?.user?.country });
        });
    }
  }, [token]);
  
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.header__items}>
          <Link to="/">
            <div className={styles.header__logo}>
              <img src={logoImg} alt="softer logo" />
              <div>
                <h1 className={styles.header__logo_text}>Софтер</h1>
              </div>
            </div>
          </Link>
          <div className={styles.header__account}>
            <Link to="/">
              <div className={styles.header__user_info}>
                {!userId ? (
                  <UserSkeleton />
                ) : (
                  <>
                    <div className={styles.header__user_items}>
                      <h1 className={styles.header__user_name}>
                        {userId.name}
                      </h1>
                      <h2 className={styles.header__user_country}>
                        Страна: {userId.country}
                      </h2>
                    </div>
                    <img src={userImg} alt="avatar logo!" />
                  </>
                )}
              </div>
            </Link>
            <YandexLogout onSuccess={logout}>
              <button className={styles.header__logout}>
                <img src={logoutImg} alt="Выйти"></img>
              </button>
            </YandexLogout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
