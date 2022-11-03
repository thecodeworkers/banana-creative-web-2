import { useState } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '@store/actions'

const methods = ['Zelle', 'Pago Móvil', 'Efectivo', 'Transferencia']

const PaymentMethod = () => {

  const dispatch = useDispatch()
  const [currentItem, setCurrentItem] = useState(0)
  const { userData } = useSelector((state: any) => state)

  const selectedItem = (item: string, index: number) => {
    dispatch(setUserData({ userData: { ...userData.userData, ...{ paymentMethod: item } } }))
    setCurrentItem(index)
  }

  return (
    <div>
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
  )
}

export default PaymentMethod
