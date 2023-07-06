import styles from "./Header.module.css"
export default function Header(){
  return (
    <header className={`py-5 ${styles.header}`}>
    <h1>Bienvenido!</h1>
    </header>
  )
}