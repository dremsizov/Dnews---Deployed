import styles from "../Profile/Profile.module.css"
import {  useContext, useState, useEffect } from "react";

import {AuthContext} from "../../../contexts/AuthContext"

import * as newsService from "../../../services/newsService"
import NewsCardProfile from "../../NewsItemCards/NewsCardProfile/NewsCardProfile";
import Spiner from "../../SPINER/Spiner";

export default function Profile () {
    document.title = 'Профил';
    const [spining, setSpining] = useState(false);
    const { auth } = useContext(AuthContext);
    const [NewsOwner, setNewsOwner] = useState([]);


    useEffect(() => {
        setSpining(true);
        newsService.getOwnerNews(auth._id)
        .then((result) => setNewsOwner(result))
        .catch((error) => console.log(error.message))
        .finally(()=> setSpining(false));      
    }, [auth]);



    return (
        <>
        <section className={styles.wrapper}>
            <div className={styles.profilewrapper}>
            {spining && <Spiner />}
                        
            <div className={styles.profileCardContainer}>
                <div className={styles.profileImage}>
                    <img src="/assets/profile8.png" alt="" />
                </div>
                <div className={styles.profileInfo}>


                <label htmlFor="">Име:</label>
                <input type="text" value={auth.firstName} disabled />
                <br />
                <label htmlFor="">Фамилия:</label>
                <input type="text" value={auth.lastName} disabled/>
                <br />
                <label htmlFor="">Меил:</label>
                <input type="text" value={auth.email} disabled/>
                <br />
                <label htmlFor="">Потребителско име:</label>
                <input type="text" value={auth.username} disabled/>
                </div>

                
                {/* <div className={styles.buttons}>
            <button
              className={styles.createBtnEdit}
              type="submit"

            >
              Промени своите профил данни
            </button>
            </div> */}
            </div>
            </div>
            <div className={styles.profileNewsCreate}>
                <div className={styles.profileNewsCreateTitle}>
                    <h2>Новините, които ти написа за нас!</h2>
                </div>

                {NewsOwner.length > 0
                
                ? (
                    <>
                    <div>
                        {NewsOwner.map(newsCard =>(
                            <NewsCardProfile key={newsCard._id}
                            {...newsCard}
                         />
                        ))}
                    </div>
                    </>
                ):
                <div>
                <p>Вие все още не сте създали своите публикации!</p>
                </div>
                }
                

            </div>
            
            
        </section> 
        </>
    )
}