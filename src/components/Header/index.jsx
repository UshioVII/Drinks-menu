import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.css";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import useModal from "../../hooks/useModal";

export default function Header() {
  const { toogleModal } = useModal();
  const [h1Text, setH1Text] = useState("");
  const [h3Text, setH3Text] = useState("");
  const [showH3Text, setShowH3Text] = useState(false);

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

  return (
    <header className={`py-5 ${styles.header}`}>
      <h1>{h1Text}</h1>
      {showH3Text && <h3>{h3Text}</h3>}
      <FontAwesomeIcon
        icon={faCartShopping}
        className={styles.cartIcon}
        onClick={toogleModal}
      />
    </header>
  );
}
