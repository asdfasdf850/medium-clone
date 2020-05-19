import React, { useState, useEffect } from 'react'
import BackendErrorMessages from './BackendErrorMessages'

const ArticleForm = ({ onSubmit, errors, initialValues }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [description, setDescription] = useState('')
  const [tagList, setTagList] = useState('')

  useEffect(() => {
    if (!initialValues) return

    setTitle(initialValues.title)
    setDescription(initialValues.description)
    setBody(initialValues.body)
    setTagList(initialValues.tagList.join(' '))
  }, [initialValues])

  const handleSubmit = e => {
    e.preventDefault()
    const article = {
      title,
      body,
      description,
      tagList
    }
    onSubmit(article)
  }

  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            {errors && <BackendErrorMessages backendErrors={errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Article Title'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='What is this article about?'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    onChange={e => setBody(e.target.value)}
                    value={body}
                    placeholder='Write your article in markdown'
                    rows='8'
                    className='form-control'
                  ></textarea>
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    onChange={e => setTagList(e.target.value)}
                    value={tagList}
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Enter tags'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <button type='submit' className='btn btn-lg pull-xs-right btn-primary'>
                    Publish Article
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleForm
