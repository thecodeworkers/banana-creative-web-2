import { useEffect } from 'react'
import { Grid } from './elements'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { setStatus } from '@store/actions'
import { useSelector } from 'react-redux'

const Portfolio = () => {
  const dispatch = useDispatch()
  const { project } = useSelector((state: any) => state)

  useEffect(() => {
    dispatch(setStatus({ theme: 'dark' }))
    return () => { dispatch(setStatus({ theme: 'light' })) }
  }, [])

  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Grid content={project} />
    </>
  )
}

export default Portfolio
