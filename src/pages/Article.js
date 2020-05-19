import React, { useEffect, useContext, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { Link, Redirect } from 'react-router-dom'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import TagList from '../components/TagList'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

const Article = ({ match }) => {
  const slug = match.params.slug
  const apiUrl = `/articles/${slug}`

  const [currentUserState] = useContext(CurrentUserContext)
  const [successfullDelete, setSuccessfullDelete] = useState(false)
  const [
    {
      response: fetchArticleResponse,
      isLoading: fetchArticleIsLoading,
      error: fetchArticleError
    },
    doFetch
  ] = useFetch(apiUrl)
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch])

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) return false
    return (
      fetchArticleResponse.article.author.username ===
      currentUserState.currentUser.username
    )
  }

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'DELETE'
    })
  }

  useEffect(() => {
    if (!deleteArticleResponse) return

    setSuccessfullDelete(true)
  }, [deleteArticleResponse])

  if (successfullDelete) {
    return <Redirect to='/' />
  }

  return (
    <div className='article-page'>
      <div className='banner'>
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className='container'>
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className='article-meta'>
              <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                <img src={fetchArticleResponse.article.author.image} alt='' />
              </Link>
              <div className='info'>
                <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className='date'>{fetchArticleResponse.article.createdAt}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                    className='btn btn-outline-secondary btn-sm'
                  >
                    <i className='ion-edit'></i>
                    Edit Article
                  </Link>
                  <button
                    onClick={deleteArticle}
                    className='btn btn-outline-danger btn-sm'
                  >
                    <i className='ion-trash-a'></i>
                    Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className='container page'>
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className='row article-content'>
            <div className='col-xs-12'>
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Article
