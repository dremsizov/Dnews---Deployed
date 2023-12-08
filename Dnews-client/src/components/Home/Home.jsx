/* eslint-disable no-unused-vars */
import styles from "../Home/HomePage.module.css";

import * as newsService from "../../services/newsService";
import { useState, useEffect } from "react";

import HomeNewsCard from "./HomeNewsCard";
import Spiner from "../SPINER/Spiner";





export default function Home() {
  const [newsSeven, setNews] = useState([]);
  const [spining, setSpining] = useState(false);
  const[hasServerError, setHasServerError]= useState(false);
  const[serverError,setServerError]= useState({})

  useEffect(() => {
    setSpining(true);
    newsService
      .getLastSevenNews()
      .then((result) => setNews(result))
      .catch( error => {
        setHasServerError(true);
        setServerError(error.message)
        console.log(error.message);
      })
      .finally(()=> setSpining(false));        
                
  }, []);

  const reversedNews = [...newsSeven].reverse();
  return (
    <>
    {spining && <Spiner />}
            {hasServerError && (
                        <p className={styles.serverError}>Грешка! За да видите новините трябва да стартирате сървъра! </p>
                    )}

              {newsSeven.length >0 
              ? (
                <>
          <div className={styles.newsContainer}>
              {reversedNews.map((newscard) => (
                 <HomeNewsCard key={newscard._id} {...newscard} />
                 ))}
          </div>
                </>

              )
              :
              <div className={styles.NoNewsContainer}>
                            <p className={styles.NoNews}>Няма новини за показване!</p>
                        </div>
              
              }
      
    </>
  );
}
