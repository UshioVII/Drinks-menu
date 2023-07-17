import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
       <div className={styles.content}></div>
      <footer className={styles.footer}>
        <small className={styles.footerText}>
          © {new Date().getFullYear()} Ushio. Todos los derechos reservados.
        </small>
      </footer>
    </div>
  );
}
