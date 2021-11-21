import { useEffect, createRef } from 'react'
import lottie from 'lottie-web'
import loader from '../../../public/images/loader.json'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setStatus } from '@store/actions'
import { useRouter } from 'next/router'

const Loader = ({ children }) => {

  const router = useRouter()
  const dispatch = useDispatch()
  const { intermittence: { showLoader } } = useSelector((state: any) => state)
  const lottieContainer: any = createRef()

  useEffect(() => {
    if (showLoader && router.pathname == '/') {
      const anim = lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: loader
      })

      anim.addEventListener('complete', () => dispatch(setStatus({ showLoader: false })))
      return () => anim.destroy()
    }
  }, [])

  return (
    <>
      <div className={router.pathname == '/' ? (showLoader ? styles._main : styles._hide) : styles._static }>
        <div className={styles._lottieParent}>
          <div className={`animation-container ${styles._lottie}`} ref={lottieContainer}></div>
        </div>
      </div>
      {children}
    </>
  )
}

export default Loader