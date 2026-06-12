import { Link } from 'react-router-dom'

import { useI18n } from '../../i18n'
import './index.scss'

const NOT_FOUND_COPY = {
  fr: { title: '404', sub: 'Page introuvable', msg: "La page que vous cherchez n'existe pas ou a été déplacée.", cta: "Retour à l'accueil" },
  en: { title: '404', sub: 'Page not found',   msg: "The page you're looking for doesn't exist or has been moved.", cta: 'Back to home' },
  es: { title: '404', sub: 'Página no encontrada', msg: 'La página que buscas no existe o ha sido movida.', cta: 'Volver al inicio' },
  de: { title: '404', sub: 'Seite nicht gefunden', msg: 'Die gesuchte Seite existiert nicht oder wurde verschoben.', cta: 'Zurück zur Startseite' },
}

const NotFound = () => {
  const { lang } = useI18n()
  const copy = NOT_FOUND_COPY[lang] || NOT_FOUND_COPY.fr

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-code">{copy.title}</span>
        <h1 className="not-found-title">{copy.sub}</h1>
        <p className="not-found-msg">{copy.msg}</p>
        <Link to="/" className="flat-button">
          {copy.cta}
        </Link>
      </div>
    </div>
  )
}

export default NotFound
