import { Rocket, RocketLaunch} from 'phosphor-react'
import styles from './Header.module.css'

export function Header() {
  return(
    <header className={styles.header}>
      <Rocket size={34} color={"var(--blue-300)"} /> <h1>to<span>do</span></h1>
    </header>
  )
}