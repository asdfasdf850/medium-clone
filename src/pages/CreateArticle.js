import React, { useEffect, useState, useContext } from 'react'
import ArticleForm from '../components/ArticleForm'
import useFetch from '../hooks/useFetch'
import { Redirect } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

const CreateArticle = () => {
  const apiUrl = `/articles`
  const [currentUserState] = useContext(CurrentUserContext)
  const [successfullSubmit, setSuccessfullSubmit] = useState(false)
  const [{ response, error }, doFetch] = useFetch(apiUrl)

  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }

  const handleSubmit = article => {
    doFetch({
      method: 'POST',
      data: {
        article
      }
    })
  }

  useEffect(() => {
    if (!response) return

    setSuccessfullSubmit(true)
  }, [response])

  if (!currentUserState.isLoggedIn) {
    return <Redirect to='/' />
  }

  if (successfullSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />
  }

  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default CreateArticle
