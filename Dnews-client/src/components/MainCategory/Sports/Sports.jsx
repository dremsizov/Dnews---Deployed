/* eslint-disable no-unused-vars */
import styles from "../Sports/Sports.module.css"
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as newsService from '../../../services/newsService'


import NewsCard from "../../NewsItemCards/NewsCardCatalog/NewsItem";
import Spiner from "../../SPINER/Spiner";


export default function SportsNews(){
    document.title = 'Спорт';
    const [sports, setSportsNews] = useState([]);
    const [spining, setSpining] = useState(false);
  const[hasServerError, setHasServerError]= useState(false);
  const[serverError,setServerError]= useState({})
    
    useEffect(() => {
        setSpining(true);
        newsService.getAllSports()
        .then(result => setSportsNews(result))
        .catch( error => {
            setHasServerError(true);
            setServerError(error.message)
            console.log(error.message);
          })
          .finally(()=> setSpining(false)); 
    }, 
    [])
    const sortedNews = [...sports].sort((a, b) => new Date(b._createdOn) - new Date(a._createdOn));
    return(
        <>
          <div className={styles.pageWrapper}> 

        <div className={styles.title}>

        <h2>В ритъма на спортните новини</h2>
        </div>

            
            {spining && <Spiner />}
            {hasServerError && (
                        <p className={styles.serverError}>Грешка! </p>
                    )}
                {sports.length > 0
                ? (
                    <>
                    {
                        sortedNews.map(newsCard => (
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
    
        </>
    )
}