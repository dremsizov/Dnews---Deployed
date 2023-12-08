/* eslint-disable no-unused-vars */
import { useState } from "react";
import styles from "../CREATE-NEWS/CreateNews.module.css";

import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";

import * as newsService from "../../../services/newsService";

Modal.setAppElement("#root");

const formCreateInitialState = {
  title: "",
  newsInfo: "",
  fullInfo: "",
  image: "",
  category: "", 
};

export default function CreateNews() {
  document.title = 'Създаване на новина';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [formCreateValues, setFormCreateValues] = useState(
    formCreateInitialState
  );
  const [errors, setErrors] = useState({});
  const [hasServerError, setHasServerError] = useState(false);
  const [serverError, setServerError] = useState({});


  const handleChange = (e) => {
    setFormCreateValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const resetCreateFormHandler = () => {
    setFormCreateValues(formCreateInitialState);
    setErrors({});
  };

  const formCreateSubmitHandler = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  //   Create NEWS /////////////

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateConfirmation = () => {
    newsService
      .createNews(formCreateValues)
      .then(() => {
        setIsModalOpen(false);
        navigate("/news");
      })

      .catch(err => {
        console.log();
        setHasServerError(true);
        setServerError(err.message);
        console.log(err.message);
    });

    resetCreateFormHandler();
  };

  // validatorssss////////////////

  //////////////////////////////// Title Validatorsssssssss
  const titleValidator = () => {
    if (formCreateValues.title.length < 5) {
      setErrors(state => ({
        ...state,
        title: "Заглавието трябва да е повече от 5 символа!",
      }));
    } else {
      if (errors.title) {
        setErrors(state => ({
          ...state,
          title: "",
        }));
      }
    }
  };
/////////////////////// NewsInfo
  const newsInfoValidator = () => {
    if (formCreateValues.newsInfo.length < 30) {
      setErrors(state => ({
        ...state,
        newsInfo: "Текстът трябва да е повече от 30 символа!",
      }));
    } 

    if (formCreateValues.newsInfo.length > 120) {
      setErrors(state => ({
        ...state,
        newsInfo: "Текстът не трябва да е повече от 120 символа!",
      }));
    } 
          
    else {
      if (errors.newsInfo) {
        setErrors(state => ({
          ...state,
          newsInfo: "",
        }));
      }
    }
  };

  // ////////////////// FullInfo
  const fullInfoValidator = () => {
    if (formCreateValues.fullInfo.length <= 0 ) {
      setErrors(state => ({
        ...state,
        fullInfo: "Полето е  задължително",
      }));
    } else {
      if (errors.fullInfo) {
        setErrors(state => ({
          ...state,
          fullInfo: "",
        }));
      }
      if (formCreateValues.fullInfo.length < 30) {
        setErrors(state => ({
          ...state,
          fullInfo: "Текстът трябва да е повече от 30 символа!",
        }));
      } 
    }
  };


  ////// Image Validator 

  function ImageValid(image){
    const regexImage = /^https?:\/\/.+$/gi;
    return regexImage.test(image)
  }

  const imageValidator = () => {
    if(!ImageValid(formCreateValues.image)){
      setErrors(state => ({
        ...state,
        image: 'Изпратеният адрес за снимка трябва да започва  с http:// или https://',
      }))
    }
    else{
      if(errors.image) {
        setErrors(state => ({
          ...state,
          image: ''
        }));
      }
    }

  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.fornContainer}>


        <form id="request" className={styles.form} onSubmit={formCreateSubmitHandler}>
          <label htmlFor="title" className={styles.titleText1} >
            {" "}
            Заглавие:
            <input
            className={styles.titleText}
              type="text"
              name="title"
              id="title"
              value={formCreateValues.title}
              onChange={handleChange}
              onBlur={titleValidator}
            />
             {errors.title && (
                  <p className={styles.errorMessage}>{errors.title}</p>
                )}
          </label>
          <br />

          <label htmlFor="newsInfo" className={styles.newsInfo}>
            Въведение в новината:
            <textarea
            className={styles.newsInfoTextArea}
              type="text"
              name="newsInfo"
              id="newsInfo"
              value={formCreateValues.newsInfo}
              onChange={handleChange}
              onBlur={newsInfoValidator}
            />
            {errors.newsInfo && (
                  <p className={styles.errorMessage}>{errors.newsInfo}</p>
                )}
          </label>
          <br />


           <label htmlFor="fullInfo" className={styles.fullInfo}>
            Пълно описание на новината:
            <textarea
            className={styles.newsInfoTextArea}
              type="text"
              name="fullInfo"
              id="fullInfo"
              value={formCreateValues.fullInfo}
              onChange={handleChange}
              onBlur={fullInfoValidator}
            />
            {errors.fullInfo && (
                  <p className={styles.errorMessage}>{errors.fullInfo}</p>
                )}
          </label>
          <br /> 

          <label htmlFor="image">
            Добавяне на снимка чрез линк:
            <input
              type="text"
              name="image"
              id="image"
              value={formCreateValues.image}
              onChange={handleChange}
              onBlur={imageValidator}
            />
            {errors.image && (
                  <p className={styles.errorMessage}>{errors.image}</p>
                )}
          </label>
          <br />

          <fieldset>
            <legend>Избери категория:</legend>
            <div className={styles.categoryOptions}>
              <div className={styles.itemOptions}>
                <label htmlFor="bg">
                  <input
                    type="radio"
                    name="category"
                    value="България"
                    id="bg"
                    checked={formCreateValues.category === "България"}
                    onChange={handleChange}
                  />
                  България
                </label>
              </div>

              <div className={styles.itemOptions}>
                <label htmlFor="world">
                  <input
                    type="radio"
                    name="category"
                    value="Свят"
                    id="world"
                    checked={formCreateValues.category === "Свят"}
                    onChange={handleChange}
                  />
                  Свят
                </label>
              </div>

              <div className={styles.itemOptions}>
                <label htmlFor="politics">
                  <input
                    type="radio"
                    name="category"
                    value="Политика"
                    id="politics"
                    checked={formCreateValues.category === "Политика"}
                    onChange={handleChange}
                  />
                  Политика
                </label>
              </div>

              <div className={styles.itemOptions}>
                <label htmlFor="economy">
                  <input
                    type="radio"
                    name="category"
                    value="Икономика"
                    id="economy"
                    checked={formCreateValues.category === "Икономика"}
                    onChange={handleChange}
                  />
                  Икономика
                </label>
              </div>

              <div className={styles.itemOptions}>
                <label htmlFor="sport">
                  <input
                    type="radio"
                    name="category"
                    value="Спорт"
                    id="sport"
                    checked={formCreateValues.category === "Спорт"}
                    onChange={handleChange}
                  />
                  Спорт
                </label>
              </div>

              <div className={styles.itemOptions}>
                <label htmlFor="lifestyle">
                  <input
                    type="radio"
                    name="category"
                    value="Любопитно"
                    id="lifestyle"
                    checked={formCreateValues.category === "Любопитно"}
                    onChange={handleChange}
                  />
                  Любопитно
                </label>
              </div>

              <div className={styles.itemOptions}>
                <label htmlFor="analitic">
                  <input
                    type="radio"
                    name="category"
                    value="Анализи"
                    id="analitic"
                    checked={formCreateValues.category === "Анализи"}
                    onChange={handleChange}
                  />
                  Анализи
                </label>
              </div>
            </div>
          </fieldset>

          <br />
          <div className={styles.buttons}>
            <button
              className={styles.createBtnYes}
              type="submit"
              disabled={
                Object.values(errors).some((x) => x) ||
                Object.values(formCreateValues).some((x) => x == "")
              }
            >
              Създай
            </button>
            <Link to="/">
              <button className={styles.cancelBtnNo} type="button">
                Отказ
              </button>
            </Link>
          </div>
          {hasServerError && (
           <p className={styles.serverError}>Грешка</p>
            )}
        </form>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          contentLabel="Create Confirmation Modal"
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <p>Сигурни ли сте, че искате да публикувате новината?</p>
          
          <div className={styles.modalbTN}> 


          <button className={styles.yes}
            type="submit"
            disabled={
              Object.values(errors).some((x) => x) ||
              Object.values(formCreateValues).some((x) => x == "")
            }
            onClick={handleCreateConfirmation}
            >
            Да
          </button>
          <button className={styles.no} onClick={handleModalClose}>Не</button>
              </div>
        </Modal>
      </div>
    </>
  );
}
