import Navigation from "./Navigation/NavigationBar";
import newsLogo from "../../../public/assets/logoMic.png";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import * as authApi from '../../services/userService';



export default function HeaderComponent() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);



  async function logoutHandler(e) {
    e.preventDefault();

    try {
      await authApi.logout();

      setAuth(null);
      navigate("/");
    } catch (error) {
      console.log(error);
      setAuth(null);
      navigate('/login');
    }
  }

  return (
    <header>
      <div className={styles["wrapper"]}>
        <div className={styles["onOff"]}>
          <div className={styles["newsLogo"]}>
            <Link to="/">
              <img
                src={newsLogo}
                className={styles["logoPicture"]}
                alt="React logo"
              />
            </Link>
            <Link to="/">
              <p className={styles["logoText"]}>Твоите новини</p>
            </Link>
          </div>
        </div>
        <div className={styles["icons"]}>


          <div className={styles["searchBTN"]}>
            <Link to="/search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </div>

          {auth ? (
            <>
              <div className={styles["create"]}>
                <Link to="/createNews">
                  <i className="fa-solid fa-plus"> Създай новина</i>
                </Link>
              </div>

              <div className={styles["profile"]}>
                <Link to="/profile">
                  <i className="fa-regular fa-address-card"> Профил</i>
                </Link>
              </div>

              <div className={styles["logout"]} onClick={logoutHandler}>
                <Link to="/logout">
                  <i className="fa-solid fa-arrow-right-from-bracket"> Изход</i>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className={styles["login"]}>
                <Link to="/login">
                  <i className="fa-solid fa-user-check"> Вход</i>
                </Link>
              </div>

              <div className={styles["register"]}>
                <Link to="/register">
                  <i className="fa-solid fa-registered"> Регистрация</i>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Navigation />
    </header>
  );
}
