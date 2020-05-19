import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-dom'
import Routes from './routes'
import TopBar from './components/TopBar'
import { CurrentUserProvider } from './contexts/CurrentUserContext'
import CurrentUserChecker from './components/CurrentUserChecker'

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  )
}

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
