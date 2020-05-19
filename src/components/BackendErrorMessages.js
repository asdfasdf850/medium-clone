import React from 'react'

const BackendErrorMessages = ({ backendErrors }) => {
  const errorMessages = Object.keys(backendErrors).map(key => {
    const value = backendErrors[key].join(' ')
    return `${key} ${value}`
  })

  return (
    <ul className='error-messages'>
      {errorMessages.map(err => (
        <li key={err}>{err}</li>
      ))}
    </ul>
  )
}

export default BackendErrorMessages
