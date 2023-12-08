import styles from "../Search_News/SearchNews.module.css"
import { useState } from "react"

import * as newsService from "../../../services/newsService";

import NewsItem from "../../NewsItemCards/NewsCardCatalog/NewsItem";

const initialSearchVaelue = {
    search: "",
}

export default function SearchNews() {
    document.title = 'Търсене';

    const [news, setNews] = useState([]);
    const[searchValue, setSearchValue] = useState(initialSearchVaelue);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [errors, setErrors] = useState({});
    


    const onChange = (event) => {
        setSearchValue(state => ({
            ...state,
            [event.target.name]: event.target.value,
        }));
    };

    function onSubmit(e) {
        e.preventDefault();

       newsService.getAll()
            .then(result => {
                const searchNews = result.filter(news =>
                    news.fullInfo.toLowerCase().includes(searchValue.search.toLowerCase()));

                setNews(searchNews);

                if (searchNews.length === 0) {
                    setSearchPerformed(true);
                } else {
                    setSearchPerformed(false);
                }
                })
                .catch(error => console.log(error));
            }

         const inputValidator = () => {
        if (searchValue.search.length < 1) {
            setErrors(state => ({ ...state, search: 'Полето не може да бъде празно!' }));
        } else {
            if (errors.search) {
                setErrors(state => ({ ...state, search: '' }));
            }
        }
    };


    
    // useEffect(() =>{
    //         newsService.getAll()
    //         .then(resutl => setNews(resutl.filter(news=>news.newsInfo
    //             .toLowerCase()
    //             .includes(searchValue.search.toLowerCase())
    //             )))
    //             .catch(err => console.log(err))
            
    //     }, [searchValue]);

    //     const onChangeHandler = (e) => {
    //         let value = '';
    //         if (e.target.type) {
    //             value = e.target.value;
    //         }
    
    //         setSearchValue(state => ({
    //             ...state,
    //             [e.target.name]: value,
    //         }));

    //     }


    return (

<div>

        <div className={styles.searchContainer}>
            
            <div className={styles.searchBox}>
                <div>
            <h1> Намери своята новина</h1>
                </div>
            <div>
            <form>
                
        <input type="text" name="search" value={searchValue.search} className={styles.searchInput} placeholder="Enter your search..." onChange={onChange} onBlur={inputValidator}/>
                
                
        <button className={styles['search-button']} disabled={Object.values(errors).some(x=>x) || (Object.values(searchValue).some(x => x == ''))} type="submit" onClick={onSubmit}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
        
            </form>
        {errors.search && (<p className={styles['errorMessage']}>{errors.search}</p>)}
                </div>        
            </div>
            </div>
                    {news.length > 0
                    ?
                    <div> 
                         {news.map(newsCard => (
                            <NewsItem key={newsCard._id} {...newsCard} />
                            ))}
                        </div>
                   
                           :
                        <div className={styles.NoFoundSearch}>
                             {searchPerformed && (<p> Няма намерени съвпадения</p>)}
                
                </div>
                }
    </div>
          
      );
            }
            