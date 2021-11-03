import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import logo from '@icons/logo.png'
import toggle from '@icons/toggle.png'
import Image from 'next/image'
import { parseHour, caracasParseHour } from '@utils'
import { useDispatch } from 'react-redux'
import { setStatus } from '@store/actions'

const Navbar = () => {

  const dispatch = useDispatch()
  const [currentHour, setCurrentHour] = useState(caracasParseHour)

  useEffect(() => {
    const interval = setInterval(getCurrentHour, 1000)
    return () => clearInterval(interval)
  }, [])

  const getCurrentHour = () => {
    const date = new Date()
    const timeZone = date.toLocaleString('en-US', { timeZone: 'America/Caracas' })
    const caracasDate = new Date(timeZone)
    const parseDate: any = parseHour(caracasDate)
    setCurrentHour(parseDate)
  }

  const openMenu = () => dispatch(setStatus({ classMenu: '_inAnimation' }))

  return (
    <div className={styles._parent}>
      <div className={styles._mainChild}>
        <div className={styles._childOne}>
          <div className={styles._toggleParent}>
            <Image
              src={logo}
              alt="logo-icon"
              width={22}
              height={22}
              quality={100}
            />
          </div>
        </div>
        <div className={styles._childTwo}>
          <p> CARACAS {currentHour} </p>
        </div>
        <div className={styles._childThree}>
          <div className={styles._toggleParent} onClick={openMenu}>
            <Image
              src={toggle}
              alt="toggle-icon"
              width={26}
              height={26}
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
