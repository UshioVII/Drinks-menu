import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CartModal.module.css";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import useModal from "../../hooks/useModal";
import { useCart } from "../../hooks/useCart";
import { ModalCard } from "./Card";

export default function CartModal() {

  const { isOpen, 
      toogleModal } = useModal()

  const { cart,
    clearCart, 
    sendOrder,
    orderTotal} = useCart();


    const handleModalBgClick = (event) => {
      // Comprobar si el clic se hizo en el fondo modal y no en el contenido del carrito
      if (event.target.classList.contains(styles.modalBg)) {
        toogleModal();
      }
    };
  
    // Detener la propagación del clic cuando se hace clic dentro del contenido del carrito
    const handleModalContentClick = (event) => {
      event.stopPropagation();
    };

  if (isOpen) return (
    <div className={styles.modalBg} onClick={handleModalBgClick}>
      <div className={styles.modal} onClick={handleModalContentClick}>
        <FontAwesomeIcon icon={faXmarkCircle} className={styles.icon} onClick={toogleModal} />
        <h2>Mi carrito</h2>
        <section className={styles.modalBody}>
          <div className={styles.modalDrinkList}>
            {cart.cartItems.length == 0 && (
              <h3>No hay productos en el caritto</h3>
            )}
          {cart.cartItems.map((drink) => (
            <ModalCard key={drink.idDrink} drink={drink}/>
            ))}
          </div>
          <aside>
            <p>Total: {orderTotal}</p>
            <div className={styles.btnContainer}>
              <button className={styles.clearCart} onClick={clearCart}>
                Vaciar carrito
              </button>
              <button className={styles.confirmOrder} onClick={sendOrder}>Confirmar compra</button>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
