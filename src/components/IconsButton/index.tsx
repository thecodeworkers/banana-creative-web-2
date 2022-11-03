import styles from './styles.module.scss'
import { Line, Star, DownArrow, Linkedin } from '@icons/svg'

const IconsButton = ({ text = '', method = null, icon = 'linkedin', right = true, pinked = false }) => {

  const selectIcon = (icon: string) => {
    if (icon == 'star') return <Star />
    if (icon == 'linkedin') return <Linkedin />
  }

  return (
    <div className={styles._main}>
      <button className={!pinked ? styles._btn : styles._btnPink} onClick={method ? method : null}>
        {/* {selectIcon(icon)} */}
        <p className={styles._text}>{text}</p>
        <div className={!right ? styles._iconParent : styles._iconParentRight}>
          <DownArrow />
        </div>
      </button>
      <Line pinked={pinked} />
    </div>
  )
}

export default IconsButton
