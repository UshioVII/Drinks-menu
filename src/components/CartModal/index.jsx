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

  if (isOpen) return (
    <div className={styles.modalBg}>
      <div className={styles.modal}>
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
