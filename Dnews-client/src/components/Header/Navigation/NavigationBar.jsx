import styles from '../Navigation/NavigationBar.module.css'

import { Link } from 'react-router-dom'


export default function NavBar() {
    return (
        <> 
        
            <nav>
            <ul className={styles['navBar']}>

                <li><Link to='/news'>Последно</Link></li>
                <li><Link to='/bg'>България</Link></li>
                <li><Link to='/world'>Свят</Link></li>
                <li><Link to='/politics'>Политика</Link></li>
                <li><Link to='/economic'>Икономика</Link></li>
                <li><Link to='/sport'>Спорт</Link></li>
                <li><Link to='/lifestyle'>Любопитно</Link></li>
                <li><Link to='/analitics'>Анализи</Link></li>

            </ul>
            </nav>
            
        </>
        
    )
}