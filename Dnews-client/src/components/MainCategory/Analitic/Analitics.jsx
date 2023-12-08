/* eslint-disable no-unused-vars */
import styles from '../Analitic/Analitic.module.css';
import { useEffect, useState } from 'react';
import * as newsService from '../../../services/newsService'
import { Link } from 'react-router-dom';


import NewsCard from "../../NewsItemCards/NewsCardCatalog/NewsItem";
import Spiner from "../../SPINER/Spiner";



export default function AnaliticsNews(){
    document.title = 'Анализи';

    const [analitics, setAnalitics] = useState([]);
    const [spining, setSpining] = useState(false);
  const[hasServerError, setHasServerError]= useState(false);
  const[serverError,setServerError]= useState({})
    
    useEffect(() => {
        setSpining(true);
        newsService.getAllAnalitics()
        .then(result => setAnalitics(result))
        .catch( error => {
            setHasServerError(true);
            setServerError(error.message)
            console.log(error.message);
          })
          .finally(()=> setSpining(false)); 
    }, 
    [])

    return(
        <>

        <div className={styles.pageWrapper}>

        <div className={styles.title}>

        <h2>Твоето място за анализи и коментари!</h2>
            </div>

            <div className={styles.workingSpace}>
            {spining && <Spiner />}
            {hasServerError && (
                        <p className={styles.serverError}>Грешка! </p>
                    )}
                {analitics.length > 0
                ? (
                    <>
                    {
                        analitics.map(newsCard => (
                            <NewsCard key={newsCard._id}
                                {...newsCard}
                                />                                                                
                                ))
                            }
                    </>
                )
                :
                <div className={styles.NoNews}>
                <div className={styles.NoNewsText}>
                <h3>Все още нямаме новини в тази категория!</h3>
                    <Link to="/createNews">
                <button className={styles.NoNewsBtn}>Създай 
                </button>
                    </Link>
                </div>
                </div>
 
 
}
            </div>
 </div>
        </>
    )
}