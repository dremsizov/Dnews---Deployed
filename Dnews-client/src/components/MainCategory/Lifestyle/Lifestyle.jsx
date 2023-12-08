/* eslint-disable no-unused-vars */
import styles from "../Lifestyle/Lifestyle.module.css"
import { Link } from "react-router-dom";

import { useEffect, useState } from 'react';
import * as newsService from '../../../services/newsService'


import NewsCard from "../../NewsItemCards/NewsCardCatalog/NewsItem";
import Spiner from "../../SPINER/Spiner";

export default function LifeStyleNews(){
    document.title = 'Любопитно';

    const [lifeStyle, setLifeStyleNews] = useState([]);
    const [spining, setSpining] = useState(false);
  const[hasServerError, setHasServerError]= useState(false);
  const[serverError,setServerError]= useState({})
    
    useEffect(() => {
        setSpining(true);
        newsService.getAllLifeStyles()
        .then(result => setLifeStyleNews(result))
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
        <div className={styles.title}>

        <h2>Всичко любипитно, което те заобикаля</h2>

            <div>
            {spining && <Spiner />}
            {hasServerError && (
                        <p className={styles.serverError}>Грешка! </p>
                    )}

                {lifeStyle.length > 0
                ? (
                    <>
                    {
                        lifeStyle.map(newsCard => (
                            <NewsCard key={newsCard._id}
                                {...newsCard}
                                />
                        ))
                    }
                    </>
                )
                :
                <div className={styles.NoNews}>
                    <div className={styles.NoNewsimg}>
                        <img src="../../../public/assets/machine.jpg" />
                    </div>
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