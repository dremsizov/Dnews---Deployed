import { Link, } from 'react-router-dom'
import styles from '../NewsItemCards/../NewsCardLast3/NewsCardLast3.module.css'
import formatData from '../../utils/formatDataUtils'

export default function NewsCardLast3({
    title,
    newsInfo,
    image,
    _createdOn,
    category,
    _id
})

{

    const handleReadMoreClick = () => {
         window.scrollTo({                                                                              
            top: 0,
            behavior: 'smooth',
        });
    };


      

    return (

        <>
       <div className={styles.wrapper}>


        <article className={styles.artCard}>

            <div className={styles.imageContainer}>
        <img src={image} alt="" />
            </div>

            

            <div className={styles.newsTextContainer}>
            <h3>{title}</h3>
            </div>

            <div className={styles.dateAndCategory}>
            <p>{formatData(_createdOn)}/ {category}</p>
            </div>
            <div className={styles.newsInfo}>
            <p>{newsInfo}</p>
            </div>        
                 
        </article>
       <div className={styles.containerBtn}>
            <button className={styles.readMoreBtn} onClick={handleReadMoreClick} >
        <Link to={`/details/${_id}`}>Прочети повече</Link>
            </button>
            </div>
       
        </div>
        </>
    )
}