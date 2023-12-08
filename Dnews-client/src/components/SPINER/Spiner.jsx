import styles from "../SPINER/Spiner.module.css"
// import SpinerImg from "../../../public/assets/loadignGIF.gif";

export default function Spiner(){
    return(
    <div className={styles.spenerContainer}>

        <div className={styles.spiner}>
            <img src='assets/spinnerPen.gif' alt="#"  />
        </div>
    </div>
    )
}