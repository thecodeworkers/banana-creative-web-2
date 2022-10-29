import styles from './styles.module.scss'
import { IconsButton } from '@components'
import { fallbackRestUrl } from '@utils/path'
import { scrolling } from '@utils'
import { useSelector } from 'react-redux'

const FirstBanner = (content) => {
  const background = `${fallbackRestUrl}${content?.content?.background.url}`
  const responsiveBackground = `${fallbackRestUrl}${content?.content?.backgroundResponsive.url}`

  const { scrollReference: { buyRef } } = useSelector((state: any) => state)

  return (
    <>
      <div className={'_banner'}>
        <div className={styles._container}>
          <div className={styles._bannerContent}>
            <p className={styles._title}>{content?.content?.title}</p>
            <p className={styles._subtitle}>{content?.content?.subtitle}</p>
            <div className={styles._btnSuperParent}>
              <div className={styles._btnParent}>
                <IconsButton pinked text={content?.content?.ButtonAgenda?.text}  right={false} method={() => scrolling(buyRef)} />
              </div>
            </div>

          </div>
        </div>
      </div>
      <style jsx>
        {`
        ._banner {
          background-image: url(${background});
          background-size: cover;
          background-position: center;
          height: 100vh;
          width: 100%;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
        @media (max-width: 576px) {
          ._banner{
            background-image: url(${responsiveBackground});
            background-attachment: initial;
          }
       `}
      </style>
    </>
  )
}

export default FirstBanner
