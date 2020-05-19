import React, { useContext, useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import BackendErrorMessages from '../components/BackendErrorMessages'
import useLocalStorage from '../hooks/useLocalStorage'
import { Redirect } from 'react-router-dom'

const Settings = () => {
  const apiUrl = `/user`

  const [image, setImage] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successfullLogout, setSuccessfullLogout] = useState(false)

  const [currentUserState, dispatch] = useContext(CurrentUserContext)
  const [, setToken] = useLocalStorage('token')
  const [{ response, error }, doFetch] = useFetch(apiUrl)

  const handleSubmit = e => {
    e.preventDefault()
    doFetch({
      method: 'PUT',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          username,
          bio,
          email,
          password
        }
      }
    })
  }

  const logout = e => {
    e.preventDefault()
    setToken('')
    dispatch({ type: 'LOGOUT' })
    setSuccessfullLogout(true)
  }

  useEffect(() => {
    if (!currentUserState.currentUser) return

    setImage(currentUserState.currentUser.image)
    setUsername(currentUserState.currentUser.username)
    setBio(currentUserState.currentUser.bio)
    setEmail(currentUserState.currentUser.email)
  }, [currentUserState.currentUser])

  useEffect(() => {
    if (!response) return

    dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
  }, [response, dispatch])

  if (successfullLogout) {
    return <Redirect to='/' />
  }

  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your settings</h1>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    onChange={e => setImage(e.target.value)}
                    value={image}
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='URL of profile picture'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Username'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    onChange={e => setBio(e.target.value)}
                    value={bio}
                    className='form-control form-control-lg'
                    rows='8'
                    placeholder='Short bio'
                  ></textarea>
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type='email'
                    className='form-control form-control-lg'
                    placeholder='Email'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    className='form-control form-control-lg'
                    placeholder='Password'
                  />
                </fieldset>
                <button type='submit' className='btn btn-lg btn-primary pull-xs-right'>
                  Update settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button onClick={logout} className='btn btn-outline-danger'>
              Or click here to logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
