import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false)

  const handleShowButton = () => {
    if (window.scrollY > 800) {
      setShowTopBtn(true)
    } else {
      setShowTopBtn(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleShowButton)

    return () => {
      window.removeEventListener('scroll', handleShowButton)
    }
  }, [])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className={styles.topToBtm}>
      {
        showTopBtn && (
          <div
            className={`${styles.iconPosition} ${styles.iconStyle}`}
            onClick={goToTop}
          >
            <i className={`${styles.arrow} ${styles.up}`}></i>
          </div>
        )
      }
    </div>
  )
}
export default ScrollToTop
