import React from "react";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import logo from "../../assets/softer.png";
import logoutImg from "../../assets/logout.svg";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
import { YandexLogout } from "react-yandex-login";
import UserSkeleton from "./UserSkeleton";

const Header = ({ logout }) => {
  const token = useSelector((state) => state.token.oAuth);
  const [userId, setUserId] = React.useState();

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
        .then((data) => setUserId(data));
    }
  }, [token]);
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.header__items}>
          <Link to="/">
            <div className={styles.header__logo}>
              <img src={logo} alt="softer logo" />
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
                        {userId?.user?.display_name}
                      </h1>
                      <h2 className={styles.header__user_country}>
                        Страна: {userId?.user?.country}
                      </h2>
                    </div>
                    <img src={user} alt="avatar logo!" />
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

export default Header;
