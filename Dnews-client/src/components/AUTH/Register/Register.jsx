import styles from "../../AUTH/Register/Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import useForm from "../../../Hooks/useForm";

import { AuthContext } from "../../../contexts/AuthContext";
import * as userService from '../../../services/userService'



const regFormInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  repass: "",
  
};

export default function Register() {
  document.title = 'Регистрация';

  const navigate = useNavigate();

  const {setAuth} = useContext(AuthContext);

  const [formRegValues, setFormRegValues] = useState(regFormInitialState);
  const [errors, setErrors] = useState({});
  const [hasServerError, setHasServerError] = useState(false);
  const [serverError, setServerError] = useState({});




  const resetRegFormHandler = () => {
    setFormRegValues(regFormInitialState);
    setErrors({})
  };

 const submitHandler = (values) => {
  
    userService.register(values)
    .then(account => {
      setAuth(account)
      navigate('/news')
      })
      .catch(error => {
        setHasServerError(true);
        setServerError(error.message);
      });

    resetRegFormHandler();
  };




  /////////////////////////////////////////////////////// FIRST NAME VALIDATOR  //////////////////////////////////////////////////////

  const firstNameValidator = () => {
    if (values.firstName.length < 2) {
      setErrors(state => ({
        ...state,
        firstName: "Собственото име трябва да е повече от 2 символа!",
      }));
    } else {
      if (errors.firstName) {
        setErrors(state => ({
          ...state,
          firstName: "",
        }));
      }
    }
  };



  ///////////////////////////////////////////// LASTNAME VALIDATOR ////////////////////////////////////////////////////////

  const lastNameValidator = () => {
    if (values.lastName.length < 2) {
      setErrors(state => ({
        ...state,
        lastName: "Фамилията име трябва да е повече от 2 символа!",
      }));
    } else {
      if (errors.lastName) {
        setErrors(state => ({
          ...state,
          lastName: "",
        }));
      }
    }
  };

    ////////////////////////////// USERNAME VALIDATOR //////////////////////////////////////////////////////

    const userNameValidator = () => {
      if (values.username.length < 4) {
        setErrors(state => ({
          ...state,
          username: "Потребителското име трябва да е повече от 4 символа!",
        }));
      } else {
        if (errors.username) {
          setErrors(state => ({
            ...state,
            username: "",
          }));
        }
      }
    };
    

    ////////////////////////// PASSWORD VALIDATOR //////////////////////////////////////////////////////

    const passwordValidator = () => {
      if(values.password.length<6){
        setErrors(state => ({
          ...state,
          password: 'Вашата парола трябва да бъде минимум 6 символа!'
        }));
      } else{
        if(errors.password){
          setErrors(state => ({
            ...state,
            password: ''
          }));
        }
      }
    }


    /////////////////////////////////// REPASS VALIDATOR //////////////////////////////////////////////////////

    const repassValidator = () => {
      if(values.password != values.repass) {
        setErrors(state => ({
          ...state,
          repass: 'Посочената парола не съвпада!'
        }));
      } else{
        if(errors.repass){
          setErrors(state =>({
            ...state,
            repass: ''
          }))
        }
      }
    }

    // /////////////////////////////////// EMAIl Validator //////////////////////////

    function emailIsValid(email){
      const regexEmail = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
      return regexEmail.test(email)
    }

    const emailValidator = () => {
      if(!emailIsValid(values.email)){
        setErrors(state => ({
          ...state,
          email: 'Посоченият от вас мейл адрес не е във валиден формат',
        }))
      }
      else{
        if(errors.email) {
          setErrors(state => ({
            ...state,
            email: ''
          }));
        }
      }

    }

    const { values, onChange, onSubmit } = useForm(submitHandler, formRegValues);

  return (
    <>
      <section className={styles["regForm"]}>
        <div className={styles["wrapper"]}>
          <form id="request" method='POST' onSubmit={onSubmit}>
           
            <h2  className={styles["title"]}>Регистрация</h2>

            <div className={styles["regContent"]}>
              <div className={styles["inputBox"]}>
                <label htmlFor="firstName">Собствено име</label>
                <input
                  type="text"
                  placeholder="собствено име"
                  name="firstName"
                  id="firstName"
                  value={values.firstName}
                  onChange={onChange}
                  onBlur={firstNameValidator}
                  required
                  className={errors.firstName && styles.errorInput}
                />
                {errors.firstName && (
                  <p className={styles.errorMessage}>{errors.firstName}</p>
                )}
              </div>

              <div className={styles["inputBox"]}>
                <label htmlFor="lastName">Фамилия</label>
                <input
                  type="text"
                  placeholder="фамилия"
                  name="lastName"
                  id="lastName"
                  value={values.lastName}
                  onChange={onChange}
                  onBlur={lastNameValidator}
                  required
                  className={errors.lastName && styles.errorInput}
                />
                {errors.lastName && (
                  <p className={styles.errorMessage}>{errors.lastName}</p>
                )}
              </div>

              <div className={styles["inputBox"]}>
                <label htmlFor="email">Имейл</label>
                <input
                  type="email"
                  placeholder="въведете валиден имейл"
                  name="email"
                  value={values.email}
                  onChange={onChange}
                  onBlur={emailValidator}
                  id="email"
                  required
                  
                />
                 {errors.email && (
                  <p className={styles.errorMessage}>{errors.email}</p>
                )}


              </div>

              <div className={styles["inputBox"]}>
                <label htmlFor="username">Потребителско име</label>
                <input
                  type="text"
                  placeholder="потребителско име"
                  name="username"
                  value={values.username}
                  onChange={onChange}
                  onBlur={userNameValidator}
                  id="username"
                  required
                  className={errors.username && styles.errorInput}
                />
                  {errors.username && (
                  <p className={styles.errorMessage}>{errors.username}</p>
                )}
              </div>

              <div className={styles["inputBox"]}>
                <label htmlFor="password">Парола</label>
                <input
                  type="password"
                  placeholder="парола"
                  name="password"
                  value={values.password}
                  onChange={onChange}
                  onBlur={passwordValidator}
                  id="password"
                  required
                  className={errors.password && styles.errorInput}
                />
               {errors.password && (
                  <p className={styles.errorMessage}>{errors.password}</p>
                )}
              </div>

              <div className={styles["inputBox"]}>
                <label htmlFor="repass">Повтори своята парола</label>
                <input
                  type="password"
                  placeholder="парола"
                  name="repass"
                  value={values.repass}
                  onChange={onChange}
                  onBlur={repassValidator}
                  id="repass"
                  required
                  className={errors.repass && styles.errorInput}
                />
                {errors.repass && (
                  <p className={styles.errorMessage}>{errors.repass}</p>
                )}
              </div>


              <div className={styles["regBtn-container"]}>
                
                <button type="submit"
                    disabled={(Object.values(errors).some(x => x)
                      || (Object.values(values).some(x => x == '')))}>
                  Регистрирай се
                </button>

                {hasServerError && (
                    <p className={styles.errorMessage}>{serverError}</p>
                  )}

                <div className={styles.loginNav}>
                  <p>
                    Вече имате регистрация?
                    <Link to='/login'> Кликни тук</Link>
                  </p>
             </div>
 

              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
