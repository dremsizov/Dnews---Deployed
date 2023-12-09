import styles from "../News_Details/NewsDetails.module.css";
import { useEffect, useState, useContext, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as newsService from "../../../services/newsService";
import * as commentsService from "../../../services/commentsService";

import { AuthContext } from "../../../contexts/AuthContext";
import useForm from "../../../Hooks/useForm";

import reducer from "./commentReducer";
import NewsCardLast from "../../NewsItemCards/NewsCardLast3/NewsCardLast3";
import formatData from "../../utils/formatDataUtils";
import Modal from "react-modal";

const formInitialState = { comment: "" };


export default function NewsDetails() {
  document.title = "Details";

  const navigate = useNavigate();

  const [comments, dispatch] = useReducer(reducer, []);
  const { auth } = useContext(AuthContext);
  const { newsID } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [newsTree, setNews] = useState([]);
  const [newsDetails, setNewsDetails] = useState({});
  

  useEffect(() => {
    newsService
      .getOneNews(newsID)
      .then((result) => setNewsDetails(result))
      .catch(err =>  {
        if (err.code == 404) { navigate('/notfound'); }
        console.log(err.message);
      })

      newsService
      .getLastTreeNews()
      .then((result) => setNews(result))
      .catch((err) => console.log(err));

    commentsService.getAllNewsComments(newsID).then((result) => {
      dispatch({
        type: "GET_ALL_COMMENTS",
        payload: result,
      });
    });
  }, [newsID, auth, navigate]);


let isOwner = false;
let isLogdin = false;

if (auth) {
  if (newsDetails._ownerId === auth._id) {
      isOwner = true;
  } else {
      isLogdin = true;
  }
}



  const addCommentHandler = async (values) => {
    try {
      
      

        const newComment = await commentsService.create(newsID, values.comment);
       
        newComment.owner = { email: auth.email };
    
       dispatch({
          type: "ADD_COMMENT",
          payload: newComment,
        });
  
    
  
      values.comment = "";
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };


  const { values, onChange, onSubmit } = useForm(
    addCommentHandler,
    formInitialState
  );

  const onDeleteNews = (e) => {
    e.preventDefault();

    newsService
      .removeNews(newsID)
      .then(() => navigate("/news"))
      .catch((err) => console.log(err));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (

        
    <div className="bigWrapper">
     
      <div className={styles.newsDetailsContainer}>
        <div className={styles.textTitleContainer}>
          <h2>{newsDetails.title}</h2>
        </div>
        <div className={styles.newsCardContainer}>
          <div className={styles.newsInfoContainer}>
            <div className={styles.categoryDateContainer}>
              <p>{newsDetails.category}</p>
              <p>{formatData(newsDetails._createdOn)}</p>
            </div>
            <div className={styles.newstextContainer}>
              <p className={styles.firstPart}>{newsDetails.newsInfo}</p>
              <p className={styles.secondPart}>{newsDetails.fullInfo}</p>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src={newsDetails.image} alt="" />
          </div>
        </div>



        {isOwner && (
          <div className={styles.btnContainer}>
            <>
              <button className={styles.editBtn}>
                <Link to={`/edit/${newsID}`}>Редактирай</Link>
              </button>
              <button
                className={styles.deteleBtn}
                type="submit"
                onClick={openModal}
              >
                Изтрий новината
              </button>
            </>
          </div>
        )}
                <br />
        {/* Coment area */}
        <br/>
        
         <div className={styles.commentsPlace}>
          <section className={styles.commentsContainer}>
            <div className={styles.comentsTitle}>
              <h3>Коментари:</h3>
              <div className={styles.comentsTextArea}>
                {comments.map(({ _id, text, owner: { email } }) => (
                  <div key={_id} className={styles.commentInfo}>
                    <p className={styles.author}> {email}:</p>
                    <br />
                    <div className={styles.iconComent}>
                      <i className="iconComent fa-regular fa-comment"></i>
                      <p className={styles.comentText}>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              {comments.length === 0 && (
                <p className={styles.noComment}>Няма коментари</p>
              )}
            </div>
                  {(isLogdin || isOwner ) && (

                <article className={styles.addComentContainer}>
              <label className={styles.addComentTitle}>Направи коментар:</label>
              <form className={styles.addFormContainer} onSubmit={onSubmit}>
                <textarea
                  className={styles.commentBox}
                  name="comment"
                  value={values.comment}
                  onChange={onChange}
                  placeholder="Коментирай"
                ></textarea>
                <input
                  disabled={values.comment == ""}
                  className="btn submit"
                  type="submit"
                  value="Изпрати"
                />
              </form>
            </article>
                  )}
            
          </section>
        </div>

        {/* Last News */}
        <div className={styles.lastTreeWrapper}>
          <div className={styles.lastTreetitle}>
            <h3>Нашите последни новини </h3>
          </div>
          <div className={styles.lastTreeContainer}>
            {newsTree.map((newsCard) => (
              <NewsCardLast key={newsCard._id} {...newsCard} />
            ))}
          </div>


        
        </div>
        {/* MODAL */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Delete Confirmation Modal"
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <p>Сигурни ли сте, че искате да изтриете новината?</p>

          <div className={styles.modalbTN}>
            <button className={styles.yes} type="button" onClick={onDeleteNews}>
              Да
            </button>
            <button className={styles.no} onClick={closeModal}>
              Не
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
