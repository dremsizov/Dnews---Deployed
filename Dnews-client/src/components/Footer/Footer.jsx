import newsLogo from '../../../public/assets/logoMic.png'
import styles from './Footer.module.css'

import { Link } from 'react-router-dom';


export default function FooterComponent() {
    return(
      <footer>
        <section className={styles['optionSection']}>


<div className={styles['footerTeam']}>
  <h2>Екип</h2>
 <p>Репортери</p>
 <p>Редактори</p>
 <p>Фоторепортери</p>
</div>

<div className={styles['footerContacts']}>
  <h2>Контакти</h2>
 <p>DNEWS</p>
 <p>София, България</p>
 <p>ул.Алеко Константинов 1002</p>
</div>

<div className={styles['footerAboutUs']}>
  <h2>Свържи се с нас</h2>
  <div className={styles['mail']}>

  <p className={styles['btnMail']}>
  <i className="fa-solid fa-envelope"> </i>
  </p>
  <p>newsroom@dnes.bg</p>
  </div>

</div>
        <div className={styles['media']}>
        <div className={styles['newsLogo']}>
        <a href="www.facebook.com" >
          <img src={newsLogo} className={styles['logoPicture']} alt="React logo" />
        </a>
        <div className={styles['sociaMedia']}>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-linkedin"></i>

        </div>
        </div>
          </div>
        </section>
<p className={styles['author']}> <Link to ="https://github.com/dremsizov">Viktor Dremsizov</Link>, React 2023</p>
      </footer>
    )
}