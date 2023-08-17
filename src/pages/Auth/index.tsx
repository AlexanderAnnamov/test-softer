import React from "react";
import { YandexLogin } from "react-yandex-login";
import { useDispatch } from "react-redux";

import { setUserToken } from "../../redux/auth/slice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Client from "../client";

import styles from "./auth.module.scss";

const clientID = "ca290a97faf0451593abd11b5a869f2e";

const yandexDiskUrl = "https://passport.yandex.ru/auth/welcome?from=cloud&origin=disk_landing_web_signin_ru&retpath=https%3A%2F%2Fdisk.yandex.ru%2Fclient%2Fdisk&backpath=https%3A%2F%2Fdisk.yandex.ru";

const Auth = () => {
  const [userData, setUserData] = useLocalStorage({}, "userData");
  const dispatch = useDispatch();

  const loginSuccess = (userData) => {
    console.log("Login success!");
    setUserData(userData);
  };

  const logoutSuccess = () => {
    console.log("Logout success!");
    setUserData({});
  };

  React.useEffect(() => {
    console.log(`ACCESS TOKEN ${userData?.access_token}`);
    if (userData) {
      dispatch(setUserToken(userData?.access_token));
    }
  }, [userData]);

  return (
    <>
      {!userData?.access_token && (
        <div className={styles.auth}>
          <div className={styles.auth__window}>
            <div className={styles.auth__items_column}>
              <p className={styles.auth__warning_text}>
                Softer-storage использует api{" "}
                <a
                  target="blank"
                  href={yandexDiskUrl}
                >
                  <span className={styles.auth__ya_disk}>Яндекс Диска</span>
                </a>
                , пожалуйста убедись что ты зарегистрирован там!
              </p>
              <div className={styles.auth__btn_column}>
                <a
                  href={yandexDiskUrl}
                  className={styles.auth__disk_btn}
                  target="blank"
                >
                  Яндекс Диск
                </a>
                <YandexLogin clientID={clientID} onSuccess={loginSuccess}>
                  <button className={styles.auth__ya_btn}>
                    Войти c Яндекс ID
                  </button>
                </YandexLogin>
              </div>
            </div>
          </div>
        </div>
      )}
      {userData?.access_token && <Client logout={logoutSuccess} />}
    </>
  );
};

export default Auth;
