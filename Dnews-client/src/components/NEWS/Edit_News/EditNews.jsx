/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "../Edit_News/EditNews.module.css";

import Modal from "react-modal";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as newsService from "../../../services/newsService";

Modal.setAppElement("#root");

const formEditInitialState = {
  title: "",
  newsInfo: "",
  fullInfo: "",
  image: "",
  category: "",
};

export default function EditNews() {
  document.title = "Редакция на новина";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { newsID } = useParams();
  const [formEditValues, setFormEditValues] = useState(formEditInitialState);
  const [errors, setErrors] = useState({});
  const [hasServerError, setHasServerError] = useState(false);
  const [serverError, setServerError] = useState({});

  useEffect(() => {
    newsService
      .getOneNews(newsID)
      .then((result) => setFormEditValues(result))
      .catch(err => {
        console.log();
        setHasServerError(true);
        setServerError(err.message);
        console.log(err.message);
    })
  }, [newsID]);

  const handleChange = (e) => {
    let value = "";
    if (
      e.target.type === "radio" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      value = e.target.value;
    }
    setFormEditValues((state) => ({
      ...state,
      [e.target.name]: value,
    }));
  };

  const resetCreateFormHandler = () => {
    setFormEditValues(formEditInitialState);
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
      .editNews(newsID, formEditValues)
      .then(() => {
        setIsModalOpen(false);
        navigate("/news");
      })

      .catch(err => {
        console.log();
        setHasServerError(true);
        setServerError(err.message);
        console.log(err.message);
    })

    resetCreateFormHandler();
  };

  // validatorssss////////////////

  //////////////////////////////// Title Validatorsssssssss
  const titleValidator = () => {
    if (formEditValues.title.length < 5) {
      setErrors((state) => ({
        ...state,
        title: "Заглавието трябва да е повече от 5 символа!",
      }));
    } else {
      if (errors.title) {
        setErrors((state) => ({
          ...state,
          title: "",
        }));
      }
    }
  };
  /////////////////////// NewsInfo
  const newsInfoValidator = () => {
    if (formEditValues.newsInfo.length < 30) {
      setErrors((state) => ({
        ...state,
        newsInfo: "Заглавието трябва да е повече от 30 символа!",
      }));
    }

    if (formEditValues.newsInfo.length > 120) {
      setErrors((state) => ({
        ...state,
        newsInfo: "Заглавието не трябва да е повече от 120 символа!",
      }));
    } else {
      if (errors.newsInfo) {
        setErrors((state) => ({
          ...state,
          newsInfo: "",
        }));
      }
    }
  };

  // ////////////////// FullInfo
  const fullInfoValidator = () => {
    if (formEditValues.fullInfo.length <= 0) {
      setErrors((state) => ({
        ...state,
        fullInfo: "Полето е  задължително",
      }));
    } else {
      if (errors.fullInfo) {
        setErrors((state) => ({
          ...state,
          fullInfo: "",
        }));
      }
    }
  };

  ////// Image Validator

  function ImageValid(image) {
    const regexImage = /^https?:\/\/.+$/gi;
    return regexImage.test(image);
  }

  const imageValidator = () => {
    if (!ImageValid(formEditValues.image)) {
      setErrors((state) => ({
        ...state,
        image:
          "Изпратеният адрес за снимка трябва да започва  с http:// или https://",
      }));
    } else {
      if (errors.image) {
        setErrors((state) => ({
          ...state,
          image: "",
        }));
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.fornContainer}>
        {hasServerError && (
                    <p className={styles.serverError}>Грешка </p>
                )}
          <form
            id="request"
            className={styles.form}
            onSubmit={formCreateSubmitHandler}
          >
            <label htmlFor="title" className={styles.titleText1}>
              {" "}
              Заглавие:
              <input
                className={styles.titleText}
                type="text"
                name="title"
                id="title"
                value={formEditValues.title}
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
                value={formEditValues.newsInfo}
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
                value={formEditValues.fullInfo}
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
                value={formEditValues.image}
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
                      checked={formEditValues.category === "България"}
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
                      checked={formEditValues.category === "Свят"}
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
                      checked={formEditValues.category === "Политика"}
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
                      checked={formEditValues.category === "Икономика"}
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
                      checked={formEditValues.category === "Спорт"}
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
                      checked={formEditValues.category === "Любопитно"}
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
                      checked={formEditValues.category === "Анализи"}
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
                  Object.values(formEditValues).some((x) => x == "")
                }
              >
                Редактирай новината
              </button>
              <Link to="/">
                <button className={styles.cancelBtnNo} type="button">
                  Отказ
                </button>
              </Link>
            </div>
          </form>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          contentLabel="Create Confirmation Modal"
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <p>Сигурни ли сте, че искате да редактирате новината?</p>

          <div className={styles.modalbTN}>
            <button
              className={styles.yes}
              type="submit"
              disabled={
                Object.values(errors).some((x) => x) ||
                Object.values(formEditValues).some((x) => x == "")
              }
              onClick={handleCreateConfirmation}
            >
              Да
            </button>
            <button className={styles.no} onClick={handleModalClose}>
              Не
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}
