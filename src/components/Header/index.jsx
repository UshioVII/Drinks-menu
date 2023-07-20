import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.css";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import useModal from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import Button from '@mui/material/Button';


export default function Header() {
  const { toogleModal } = useModal();
  const [h1Text, setH1Text] = useState("");
  const [h3Text, setH3Text] = useState("");
  const [showH3Text, setShowH3Text] = useState(false);

  //cart
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const h1OriginalText = "¡ Bienvenido a !";
    const h3OriginalText = "ビンクスの酒";
    let h1TypedText = "";
    let h3TypedText = "";

    let h1Index = 0;
    let h3Index = 0;

    const typingEffect = setInterval(() => {
      if (h1Index < h1OriginalText.length) {
        h1TypedText += h1OriginalText[h1Index];
        setH1Text(h1TypedText);
        h1Index++;
      } else if (!showH3Text && h3Index < h3OriginalText.length) {
        h3TypedText += h3OriginalText[h3Index];
        setH3Text(h3TypedText);
        h3Index++;
        if (h3Index >= h3OriginalText.length) {
          setShowH3Text(true);
        }
      } else {
        clearInterval(typingEffect);
      }
    }, 150);

    return () => {
      clearInterval(typingEffect);
    };
  }, []);

   const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <header className={`py-3 ${styles.header}`}>

      <h1>{h1Text}</h1>

      {showH3Text && <h3>{h3Text}</h3>}

      {
        currentUser && (
          <>
              
              <div className="d-flex text-center align-items-baseline justify-content-end p-0 m-0">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className={styles.cartIcon}
                  onClick={toogleModal}
                />
                <p className="mx-2">{capitalizeFirstLetter(currentUser.name)}</p>
                <Button className="btn btn-primary btn-sm mx-2" onClick={logout}>Cerrar sesión</Button>
              </div>
          </>
        )}

    </header>
  );
}
