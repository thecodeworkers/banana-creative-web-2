import { takeLatest, call, put } from 'redux-saga/effects'
import { actionObject, GraphQlClient, manageError } from '@utils'
import { homePage, fontQuery, footerQuery, headerQuery, aboutPage, portfolioPage, projectsQuery } from '@graphql/query'
import { GET_PAGE, GET_PAGE_ASYNC } from './action-types'
import { setFonts } from '../font/action'
import { setLanguage } from '@store/actions'
import { setProjects } from '@store/projects/action'

const getQueryPages = (page = 'home', locale = 'en') => {

  const pages = {
    home: homePage,
    aboutUs: aboutPage,
    portfolio: portfolioPage
  }

  return `
    query {
      ${headerQuery(locale)}
      ${footerQuery(locale)}
      ${pages[page](locale)}
      ${fontQuery}
      ${page === 'portfolio' ? projectsQuery : ''}
    }
  `
}

function* getPageAsync({ payload }) {

  try {
    const { query, language = 'es' } = payload
    const response = yield call(GraphQlClient, getQueryPages(query, language), { locale: language })
    const { page, font, header, footer, projects } = response?.data

    yield put(setFonts(font))
    if(query === 'portfolio') yield put(setProjects(projects))
    yield put(actionObject(GET_PAGE_ASYNC, { [query]: page, header, footer }))
    yield put(setLanguage(language))
  } catch (err) {
    yield call(manageError, err)
  }
}

export function* watchGetPages() {
  yield takeLatest(GET_PAGE, getPageAsync)
}

