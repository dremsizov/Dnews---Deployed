import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import useForm from "../../../Hooks/useForm";
import styles from "../../AUTH/Login/Login.module.css";
import * as userService from "../../../services/userService";
import { AuthContext } from "../../../contexts/AuthContext";

const formInitialData = {
  email: "",
  password: "",
};

export default function Login() {
  document.title = "Вход";

  const navigate = useNavigate();

  const [seePassword, setSeePassword] = useState(false);
  const { setAuth } = useContext(AuthContext);

  const [formValues, setFormValues] = useState(formInitialData);

  const [errors, setErrors] = useState({});

  const [hasServerError, setHasServerError] = useState(false);
  const [serverError, setServerError] = useState({});



  const resetFormHandler = () => {
    setFormValues(formInitialData);
    setErrors({});
  };

  const submitHandler = (values) => {
    userService
      .login(values)
      .then((account) => {
        setAuth(account);
        navigate("/");

       })
       .catch(error => {
        setHasServerError(true);
        setServerError(error.message);
      });
    resetFormHandler();
  };

  ///////////////////////////////////////////////////////// Validations

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    return emailRegex.test(email);
  }

  const emailValidator = () => {
    if (!validateEmail(values.email)) {
      setErrors((state) => ({
        ...state,
        email: "Посоченият от вас мейл адрес не е във валиден формат",
      }));
    } else {
      if (errors.email) {
        setErrors((state) => ({ ...state, email: "" }));
      }
    }
  };

  const passwordValidator = () => {
    if (values.password.length < 6) {
      setErrors((state) => ({
        ...state,
        password: "Паролата трябва да бъде минимум 6 символа!",
      }));
    } else {
      if (errors.password) {
        setErrors((state) => ({ ...state, password: "" }));
      }
    }
  };

  const { values, onSubmit, onChange } = useForm(submitHandler, formValues);

  const SeePasswordTogle = () => {
    setSeePassword(!seePassword);
  };






  return (
    <>
      <div className={styles["wrapper"]}>
        <section className={styles["loginForm"]}>
          <div className={styles.workingSpace}>
            <div className={styles.title}>
              <h2 className={styles["title"]}>Влез в своя профил</h2>
            </div>

            <div className={styles.formPlace}>
              <form
                id="request"
                method="POST"
                className={styles["formlog"]}
                onSubmit={onSubmit}
              >
                
                <div className={styles["textIntput"]}>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="мейл"
                      name="email"
                      id="email"
                      required
                      onChange={onChange}
                      value={values.email}
                      onBlur={emailValidator}
                    />
                    <i className="fa-solid fa-at icon"></i>
                    {errors.email && (
                  <p className={styles.errorMessage}>{errors.email}</p>
                )}
                  </div>
                  
                </div>

                
                <div className={styles["pass"]}>
                  <div className={`${styles["textIntput"]} ${styles['inputWrapper']}`}>
                    <input
                      className={styles.formInput}
                      type={seePassword ? "text" : "password"}
                      id="password"
                      placeholder="парола"
                      name="password"
                      required
                      onChange={onChange}
                      value={values.password}
                      onBlur={passwordValidator}
                    />

                    <div
                      onClick={SeePasswordTogle}
                      className={styles.showHideBtn}
                    >
                      {seePassword ? (
                        <i className="fa-regular fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </div>
                    {errors.password && (
                  <p className={styles.errorMessage}>{errors.password}</p>
                )}
                  </div>
                </div>

                <div className={styles["signUp"]}>
                  <button
                    type="submit"
                    disabled={
                      Object.values(errors).some((x) => x) ||
                      Object.values(values).some((x) => x == "")
                    }
                  >
                    Влез
                  </button>

                  {hasServerError && (
                    <p className={styles.serverError}>{serverError}</p>
                  )}

                  <div className={styles.loginNav}>
                    <p>
                      Все още нямате регистрация?
                      <Link to="/register">Кликни тук</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
