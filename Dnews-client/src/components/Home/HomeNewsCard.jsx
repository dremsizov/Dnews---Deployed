/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "../Home/HomeNewsCard.module.css/";
import formatData from "../utils/formatDataUtils";

export default function HomeNewsCard({
  title,
  newsInfo,
  image,
  _createdOn,
  category,
  _id,
}) {
  return (
    <>
      <div className={styles["wrapper"]}>
        <article className={styles["newsCard"]}>
          <div className={styles["cardNewsImg"]}>
            <Link to={`/details/${_id}`}>
              <img src={image} alt="CardPic" />
            </Link>
          </div>

          <div className={styles["cardNewsInfo"]}>
            <h3>{title}</h3>
            <p className={styles["publicDate"]}>
              {formatData(_createdOn)}/ {category}
            </p>
            <p className={styles["firstrow"]}>{newsInfo}</p>
          </div>
        </article>
      </div>
    </>
  );
}
