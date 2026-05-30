import { useEffect, useState } from 'react'

import {
  faCode,
  faDatabase,
  faMagnifyingGlass,
  faScrewdriverWrench,
  faServer,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'
import { Link } from 'react-router-dom'

import { useI18n } from '../../i18n'
import AnimatedLetters from '../AnimatedLetters'
import SEO from '../SEO'
import './index.scss'

const ICONS = [faCode, faMagnifyingGlass, faScrewdriverWrench, faServer, faDatabase]

const TECH_STACKS = [
  ['React', 'Next.js', 'WordPress', 'Bootstrap'],
  ['Yoast', 'Google Search', 'Lighthouse'],
  ['Docker', 'Linux', 'Cloudflare'],
  ['React', 'Laravel', 'Next.js', 'JWT'],
  ['REST API', 'Node.js', 'MySQL', 'MongoDB'],
]

const Services = () => {
  const { t } = useI18n()
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 2000)
    return () => clearTimeout(timer)
  }, [])

  const items = t('services.items')
  const steps = t('services.steps')

  return (
    <>
      <SEO
        title="Services — Création Site Web Maroc"
        description="Création site web Maroc dès 300€, SEO dès 150€, application web dès 800€. Développeur freelance à Fès. Devis gratuit, livraison rapide, code propre."
        path="/services"
      />
      <div className="container services-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={t('services.title').split('')}
              idx={15}
            />
          </h1>
          <p>{t('services.intro')}</p>
          <div className="rating">
            {[1, 2, 3, 4].map((i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="star" />
            ))}
            <FontAwesomeIcon icon={faStar} className="star star-empty" />
          </div>
          <Link to="/contact" className="flat-button">
            {t('services.cta')}
          </Link>
        </div>

        <div className="services-wrap">
          {items.map((service, index) => (
            <div
              key={index}
              className="service-card"
              style={{ animationDelay: `${1.2 + index * 0.15}s` }}
            >
              <div className="service-icon">
                <FontAwesomeIcon icon={ICONS[index]} />
              </div>
              <div className="service-content">
                <div className="service-head">
                  <h2>{service.title}</h2>
                  {service.price && (
                    <span className="service-price">{service.price}</span>
                  )}
                </div>
                <p>{service.desc}</p>
                <div className="service-tech">
                  {TECH_STACKS[index].map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Process steps */}
          <div className="process-section" style={{ animationDelay: `${1.2 + items.length * 0.15 + 0.2}s` }}>
            <p className="process-title">{t('services.processTitle')}</p>
            <div className="process-steps">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="process-step"
                  style={{ animationDelay: `${1.2 + items.length * 0.15 + 0.3 + i * 0.1}s` }}
                >
                  <div className="step-number">0{i + 1}</div>
                  <div className="step-label">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Services
