import React, { useEffect, useState, useContext } from 'react'
import ArticleForm from '../components/ArticleForm'
import useFetch from '../hooks/useFetch'
import { Redirect } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

const EditArticle = ({ match }) => {
  const slug = match.params.slug
  const apiUrl = `/articles/${slug}`

  const [initialValues, setInitialValues] = useState(null)
  const [successfullSubmit, setSuccessfullSubmit] = useState(false)
  const [currentUserState] = useContext(CurrentUserContext)
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl)
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle
  ] = useFetch(apiUrl)

  const handleSubmit = article => {
    doUpdateArticle({
      method: 'PUT',
      data: {
        article
      }
    })
  }

  useEffect(() => {
    doFetchArticle()
  }, [doFetchArticle])

  useEffect(() => {
    if (!fetchArticleResponse) return

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList
    })
  }, [fetchArticleResponse])

  useEffect(() => {
    if (!updateArticleResponse) return

    setSuccessfullSubmit(true)
  }, [updateArticleResponse])

  if (!currentUserState.isLoggedIn) {
    return <Redirect to='/' />
  }

  if (successfullSubmit) {
    return <Redirect to={`/articles/${slug}`} />
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  )
}

export default EditArticle
