import Cookies from 'js-cookie'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { extractToken, signIn } from '../../api/auth'
import './index.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  if (Cookies.get('jwt_token')) {
    return <Navigate to="/" replace />
  }

  const onSubmitForm = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      const data = await signIn(email, password)
      const token = extractToken(data)

      if (!token) {
        throw new Error('Sign in succeeded but no token was returned.')
      }

      Cookies.set('jwt_token', token, { expires: 7 })
      navigate('/', { replace: true })
    } catch (error) {
      setErrorMessage(error.message)
      setIsLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="left-panel">
        <div className="left-content">
          <h1 className="login-logo">NXTFLIX</h1>
          <p className="login-tagline">
            Unlimited movies, shows and more. Watch anywhere. Cancel anytime.
          </p>
        </div>
      </section>

      <section className="right-panel">
        <form className="login-card" onSubmit={onSubmitForm}>
          <h2 className="login-card-title">Sign In</h2>

          {errorMessage && (
            <p className="login-error" role="alert">
              {errorMessage}
            </p>
          )}

          <div className="login-field">
            <label className="login-label" htmlFor="email">
              EMAIL
            </label>
            <input
              className="login-input"
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="login-input"
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="login-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
