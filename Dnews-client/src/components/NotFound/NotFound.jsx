import styles from '../NotFound/NotFound.module.css'

export default function NotFound(){
    document.title = 'Грешка';
    return(
        <>
        <div className={styles['image']}>

        <img src="assets/not_found_page.png" alt="" />
        </div>
        </>
    );

}