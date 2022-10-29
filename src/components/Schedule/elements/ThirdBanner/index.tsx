import { useEffect, useRef } from 'react'
import { CountProduct } from '@components'
import { fallbackRestUrl } from '@utils/path'
import styles from './styles.module.scss'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { setReference } from '@store/actions'
import { setStatus } from '@store/actions'
import { showToast } from  '@utils'

const ThirdBanner = (content, data) => {
  const background = `${fallbackRestUrl}${content?.data?.background.url}`
  const responsiveBackground = `${fallbackRestUrl}${content?.data?.backgroundResponsive.url}`

  const { intermittence: { scheduleNumber } } = useSelector((state: any) => state)
  const purposeRef = useRef()
  const dispatch = useDispatch()

  const openModal = () => {
    if (scheduleNumber > 0) return dispatch(setStatus({ formModal: true }))
    dispatch(setStatus({ validationModal: true }))
    showToast(dispatch, '#FF4F4F', 'error', 'Intenta nuevamente!')
  }

  useEffect(() => {
    dispatch(setStatus({ scheduleNumber: 0 }))
    dispatch(setReference({ purposeRef }))
    return () => { dispatch(setReference({ purposeRef: null })) }
  }, [])

  return (
    <>
      <div className={styles._main}>
        <div className={styles._container}>
          <div className={styles._leftSide}>
            <Image src={`${fallbackRestUrl}${content?.content?.productImage.url}`} alt="book" width={675} height={695} quality={100} />
          </div>
          <div className={styles._leftSideResponsive}>
            <Image src={`${fallbackRestUrl}${content?.content?.productImageResponsive.url}`} alt="book" width={232} height={245} quality={100} />
          </div>
          <div className={styles._rightside}>
            <p className={styles._title}>{content?.content?.name}</p>
            <div className={styles._contentText}>
              {content?.content?.features?.map(function (item, index) {
                return (
                  <div key={index} className={styles._textContent}>
                    <p className={styles._blackSubtitle}>{item.feature}</p>
                  </div>
                )
              })
              }
            </div>
            <p className={styles._subtitle}>{content?.content?.description}</p>
            <div className={styles._buttonsContainer}>
              <div className={styles._counterContainer}>
                <CountProduct />
              </div>
              <div className={styles._servicesBtnParent}>
                <button className='_btn' onClick={openModal}>
                  <p className={styles._text}>{content?.content?.buttonCart.text}</p>
                  <p className={styles._text}> {content?.content?.price}</p>
                </button>
              </div>
            </div>
          </div>

        </div>
        <div ref={purposeRef} className={'_banner'}>
          <p className={styles._bigTitle}>{content?.data?.title}</p>
          <div className={styles._lineParent}>
            <div className={styles._line}></div>
            <div className={styles._lineContainer}>
              <span>{content?.data?.subtitle}</span>
              <p>{content?.data?.content}</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
        ._banner{
          background-image: url(${background});
          background-size: cover;
          background-position: center;
          min-height: 40vh;
          width: 100%;
          background-repeat: no-repeat;
        }
        ._btn {
          width: 100%;
          height: 3.8rem;
          background-color: #D480FF;
          box-sizing: border-box;
          color: #fff;
          padding: 1.8rem;
          display: flex;
          justify-content:space-between;
          align-items: center;
          white-space: nowrap;
          cursor: pointer;
          border: none;
        }
        @media(max-width: 576px) {
          ._banner{
            background-image: url(${responsiveBackground});
            height: 70vh;
          }
       `}
      </style>
    </>
  )
}

export default ThirdBanner
