import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '@store/actions'

const methods = ['Zelle', 'Pago Móvil', 'Efectivo', 'Transferencia']
const deliveryMethod = ['Pick-up: Torre IASA, La Castellana, Caracas', 'Envío nacional', 'Delivery']

const PaymentMethod = () => {

  const dispatch = useDispatch()
  const [currentItem, setCurrentItem] = useState(0)
  const [currentDelivery, setCurrentDelivery] = useState(0)
  const { userData } = useSelector((state: any) => state)

  const selectedItem = (item: string, index: number) => {
    dispatch(setUserData({ userData: { ...userData.userData, ...{ paymentMethod: item } } }))
    setCurrentItem(index)
  }

  const selectedDelivery = (item: string, index: number) => {
    dispatch(setUserData({ userData: { ...userData.userData, ...{ delivery: item } } }))
    setCurrentDelivery(index)
  }

  useEffect(() => {
    selectedDelivery('Pick-up: Torre IASA, La Castellana, Caracas', 0)
  }, [])

  return (
    <div className={styles._mainContainer}>
      <div className={styles._sidesContainer}>
        <div className={styles._content}>
          <h1 className={styles._title}> Forma de pago </h1>
          {
            methods.map((item, index) => (
              <div className={currentItem == index ? styles._cardSelected : styles._card} key={index} onClick={() => selectedItem(item, index)}>
                <div className={currentItem == index ? styles._circleSelected : styles._circle}>
                  <div className={currentItem == index ? styles._childCircleSelected : styles._childCircle}>
                  </div>
                </div>
                <p className={currentItem == index ? styles._selectedText : styles._text}>{item}</p>
              </div>
            ))
          }

        </div>

        <div className={styles._contentRight}>
          <h1 className={styles._title}> Forma de Entrega </h1>
          {
            deliveryMethod.map((item, index) => (
              <div className={currentDelivery == index ? styles._cardSelected : styles._card} key={index} onClick={() => selectedDelivery(item, index)}>
                <div className={currentDelivery == index ? styles._circleSelected : styles._circle}>
                  <div className={currentDelivery == index ? styles._childCircleSelected : styles._childCircle}>
                  </div>
                </div>
                <p className={currentDelivery == index ? styles._selectedText : styles._text}>{item}</p>
              </div>
            ))
          }

        </div>

      </div>
    </div>
  )
}

export default PaymentMethod
