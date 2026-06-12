import { Component } from 'react'

import { Link } from 'react-router-dom'

import './index.scss'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-page">
          <div className="error-boundary-content">
            <span className="error-boundary-icon">⚠</span>
            <h1>Oops, quelque chose s'est cassé</h1>
            <p>Une erreur inattendue s'est produite. Veuillez recharger la page ou retourner à l'accueil.</p>
            <div className="error-boundary-actions">
              <button
                className="flat-button"
                onClick={() => {
                  this.setState({ hasError: false })
                  window.location.reload()
                }}
              >
                Recharger
              </button>
              <Link
                to="/"
                className="flat-button flat-button--outline"
                onClick={() => this.setState({ hasError: false })}
              >
                Accueil
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
