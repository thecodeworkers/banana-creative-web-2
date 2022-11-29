import { useState, useEffect } from 'react'
import { DownArrow } from '@icons/svg'
import styles from './styles.module.scss'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { fallbackRestUrl, paginate, scrollTo } from '@utils'
import { Pagination, ScrollToTop } from '@components'

const perPage = 12

const Grid = (content) => {
  const [showFilters, setShowFilters] = useState(false)
  const showHideFilters = () => setShowFilters(showFilters => !showFilters)
  const { project: { projects } } = useSelector((state: any) => state)
  const [tmpAllProjects, setTmpAllProjects] = useState(projects)
  const [processedArray, setProcededArray] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentFilter, setCurrentFilter] = useState('All')

  useEffect(() => {
    const columns = 4
    let elementPerColumn = tmpAllProjects.length / columns
    elementPerColumn = elementPerColumn < 1 ? 1 : elementPerColumn

    const localProjects = []
    let fromIndex = 0

    const ceilNumber = (num: number) => Math.ceil(num)

    const determinateElementPerColumn = (index: number, elementPerColumn: number) => {
      const decimal = elementPerColumn.toString().split('.')[1]

      if (decimal) {
        if (decimal == '25' && index == 0) return ceilNumber(elementPerColumn)
        if (decimal == '5' && (index == 0 || index == 1)) return ceilNumber(elementPerColumn)
        if (decimal == '75' && (index == 0 || index == 1 || index == 2)) return ceilNumber(elementPerColumn)
      }

      return Math.floor(elementPerColumn)
    }

    for (let i = 0; i < columns; i++) {
      const toIndex = fromIndex + determinateElementPerColumn(i, elementPerColumn)
      localProjects.push(tmpAllProjects.slice(fromIndex, toIndex))
      fromIndex = toIndex
    }

    setProcededArray(localProjects)
  }, [tmpAllProjects])

  const filterBy = (criteria) => {
    setCurrentFilter(criteria)
    if (criteria === 'All') return setTmpAllProjects(projects)
    const result = projects.filter((item) => item?.categories?.name === criteria)
    if (result) setTmpAllProjects(result)
  }

  const changePageAndScroll = (page: number) => {
    setCurrentPage(page)
    scrollTo(null, 0, true)
  }

  const handleScroll = () => {
    if (window.scrollY > 800 && window.scrollY < 50000) {
      setTmpAllProjects(p => [...p, ...tmpAllProjects])
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles._main}>
      <ScrollToTop />
      <div className={styles._filters}>
        <ul className={styles._list}>
          {
            content?.content?.categories?.map((item, index) => (
              <li
                className={currentFilter == item.name ? styles._liSelected : styles._li}
                onClick={() => filterBy(item.name)}
                key={index}>{item.name}</li>
            ))
          }
        </ul>
      </div>

      <div className={styles._grid}>
        <div className={styles._gridChild}>
          {
            processedArray.map((project, index) => (
              <div key={index} className={styles._column}>
                {
                  project.map((p, index) => (

                    <div key={index} className={styles._itemParent}>
                      <a href={p?.url} target='_blank' rel='noreferrer' >
                        <div className={styles._item}>
                          <Image
                            src={`${fallbackRestUrl}${p?.portrait?.image?.url}`}
                            blurDataURL={`${fallbackRestUrl}${p?.portrait?.image?.url}`}
                            alt={p?.portrait?.image?.name}
                            layout='fill'
                            quality={100}
                            objectFit='cover'
                            placeholder="blur" />
                          <div className={styles._description}>
                            <p>{p?.categories?.name}</p>
                          </div>

                          <div className={styles._logo}>
                            <Image src={`${fallbackRestUrl}${p?.logoHover?.image?.url}`} alt={p?.portrait?.image?.name} width='100%' height='100%' />
                          </div>
                        </div>
                      </a>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>

      <div className={styles._responsiveGridParent}>
        <div className={styles._filtersBtn} onClick={showHideFilters}>
          <p>filters</p>
          <div className={showFilters ? styles._arrowParentTop : styles._arrowParent}>
            <DownArrow />
          </div>
        </div>

        {
          showFilters && (
            <div className={styles._phoneFilters}>
              <ul className={styles._phoneList}>
                {
                  content?.content?.categories.slice(0, 4).map((item, index) => (
                    <li
                      onClick={() => filterBy(item.name)}
                      key={index}>{item.name}</li>
                  ))
                }
              </ul>

              <ul className={styles._phoneList}>
                {
                  content?.content?.categories.slice(4, 8).map((item, index) => {
                    return <li key={index} onClick={() => filterBy(item.name)}>{item.name}</li>
                  })
                }
              </ul>
            </div>
          )
        }

        <div className={styles._responsiveGrid}>

          {
            paginate(tmpAllProjects, currentPage, perPage).map((p, index) => {
              return (
                <a href={p?.url} target='_blank' rel='noreferrer' key={index}>
                  <div
                    className={styles._picture}
                    style={{ backgroundImage: `url(${fallbackRestUrl}${p?.portrait?.imageResponsive?.url})` }}>
                  </div>
                </a>
              )
            })
          }

        </div>

        <div className={styles._navigationParent}>
          <Pagination
            currentPage={currentPage}
            items={tmpAllProjects}
            perPage={perPage}
            changePage={(page: number) => changePageAndScroll(page)}
          />
        </div>
      </div>
    </div>
  )
}

export default Grid
