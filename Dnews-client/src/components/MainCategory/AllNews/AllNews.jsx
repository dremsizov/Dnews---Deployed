/* eslint-disable no-unused-vars */
import * as newsService from "../../../services/newsService";
import styles from '../AllNews/AllNews.module.css'


import { useState, useEffect } from "react";
import NewsItem from "../../NewsItemCards/NewsCardCatalog/NewsItem";
import Spiner from "../../SPINER/Spiner";


export default function AllNews() {
    document.title = 'Всички новини';

    const [allNews,setAllNews] = useState([]);
    const [spining, setSpining] = useState(false);
  const[hasServerError, setHasServerError]= useState(false);
  const[serverError,setServerError]= useState({})



    useEffect(() => {
        setSpining(true);
        newsService.getAll()
       .then(result =>setAllNews(result))
       .catch( error => {
        setHasServerError(true);
        setServerError(error.message)
        console.log(error.message);
      })
      .finally(()=> setSpining(false)); 

    }, []);

    const reversedNews = [...allNews].reverse();

    return(
        <>
        <div className={styles.catalogContainer}>

      <h2> Следи новините! Всеки час, за да знаеш, за да си информиран, за да си независим!</h2>
     
        <div>
        {spining && <Spiner />}
            {hasServerError && (
                        <p className={styles.serverError}>Грешка! </p>
                    )}

                    {allNews.length>0
                    ?
                    (
                        <>
                        {reversedNews.map(newscard =>(
                            <NewsItem key={newscard._id}
                            {...newscard}
                            />
                            ))}
                            </>
                    )
                    :
                    <div className={styles.NoNewsContainer}>
                    <p className={styles.NoNews}>Няма новини за показване!</p>
                </div>
                    }

            
        </div>
                </div>
            </>
        
             
    
    );
}