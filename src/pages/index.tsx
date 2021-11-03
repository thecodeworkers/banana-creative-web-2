import { Home } from '@components'
import { useSelector } from 'react-redux'
import { fallbackRestUrl } from '@utils/path'
import wrapper from '@store'
import { mapProps } from '@utils'
import { getPage } from '@store/actions'

const HomePage = () => {
  const { page: { pages }, font: { bold, normal, light, medium } } = useSelector((state: any) => state)

  return (
    <div>
      <div>
        <Home />
      </div >
      <style jsx>{`
        @font-face {
          font-family: 'NormalFont';
          src: url('${fallbackRestUrl}${normal?.url}');
        }
        @font-face {
          font-family: 'c';
          src: url('${fallbackRestUrl}${bold?.url}');
        }
        @font-face {
          font-family: 'LightFont';
          src: url('${fallbackRestUrl}${light?.url}');
        }
        @font-face {
          font-family: 'NormalFont';
          src: url('${fallbackRestUrl}${medium?.url}');
        }
        `}
      </style>
    </div >
  )
}

export default HomePage

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, res }) => {
    await mapProps(store, getPage())
  }
)
