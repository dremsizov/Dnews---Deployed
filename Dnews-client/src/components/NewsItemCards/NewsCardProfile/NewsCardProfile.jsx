import { Link } from 'react-router-dom'
import styles from '../NewsItemCards/../NewsCardProfile/NewsCardProfile.module.css'
import formatData from '../../utils/formatDataUtils'

export default function NewsCardProfile({
    title,
    newsInfo,
    image,
    _createdOn,
    category,
    _id

}){
    return (

        <>
       <div className={styles['wrapper']}>


        <article className={styles['artCard']}>
            <div className={styles['newsCardT']}>

        <img src={image} alt="" />
        <div className={styles['newsInfo']}>
            <h3>{title}</h3>
            <p className={styles['newsDate']}>{formatData(_createdOn)}/ {category}</p>
           <button className={styles.readMoreBtn}>
            <Link to={`/details/${_id}`}>Прочети повече</Link>
        </button>
        </div>
        
            </div>
        </article>

  
       </div>
        </>
    )
}