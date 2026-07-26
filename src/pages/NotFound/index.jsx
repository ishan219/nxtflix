import { Link } from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <main className="not-found-page">
    <h1 className="not-found-code">404</h1>
    <h2 className="not-found-title">Page Not Found</h2>
    <p className="not-found-text">
      The page you are looking for does not exist or has been moved.
    </p>
    <Link className="not-found-link" to="/">
      Back to Home
    </Link>
  </main>
)

export default NotFound
