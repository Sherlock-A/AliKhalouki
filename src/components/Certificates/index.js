import { useEffect, useState } from 'react'

import {
  faArrowUpRightFromSquare,
  faAward,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'
import { Link } from 'react-router-dom'

import { useI18n } from '../../i18n'
import AnimatedLetters from '../AnimatedLetters'
import SEO from '../SEO'
import './index.scss'

const CATEGORY_COLORS = {
  Frontend:  '#06B6D4',
  Backend:   '#2563EB',
  DevOps:    '#7c3aed',
  Systèmes:  '#d97706',
  Design:    '#e1306c',
}

// ── Placeholder data — replace with your real certificates ──────────────────
const CERTS = [
  {
    institution: 'freeCodeCamp',
    title: 'Responsive Web Design',
    date: '2022',
    category: 'Frontend',
    url: 'https://www.freecodecamp.org/certification',
  },
  {
    institution: 'freeCodeCamp',
    title: 'JavaScript Algorithms & Data Structures',
    date: '2022',
    category: 'Frontend',
    url: 'https://www.freecodecamp.org/certification',
  },
  {
    institution: 'Udemy',
    title: 'React Front To Back',
    date: '2022',
    category: 'Frontend',
    url: null,
  },
  {
    institution: 'Udemy',
    title: 'PHP & Laravel — Complete Guide',
    date: '2023',
    category: 'Backend',
    url: null,
  },
  {
    institution: 'Linux Foundation',
    title: 'Introduction to Linux',
    date: '2023',
    category: 'Systèmes',
    url: 'https://www.linuxfoundation.org',
  },
  {
    institution: 'Docker Inc.',
    title: 'Docker Fundamentals',
    date: '2023',
    category: 'DevOps',
    url: null,
  },
  {
    institution: 'Coursera / Meta',
    title: 'Advanced React',
    date: '2024',
    category: 'Frontend',
    url: 'https://www.coursera.org',
  },
]

const Certificates = () => {
  const { t } = useI18n()
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <SEO
        title="Certifications"
        description="Certifications freeCodeCamp, Udemy, Linux Foundation, Docker. Parcours technique full-stack de Ali Khalouki, développeur web freelance au Maroc."
        path="/certificates"
      />
      <div className="container certificates-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={t('certificates.title').split('')}
              idx={15}
            />
          </h1>
          <p>{t('certificates.intro')}</p>
          <Link to="/contact" className="flat-button cert-cta">
            {t('certificates.cta')}
          </Link>
        </div>

        <div className="certificates-wrap">
          {CERTS.map((cert, index) => {
            const color = CATEGORY_COLORS[cert.category] || '#06B6D4'
            return (
              <div
                key={index}
                className="cert-card"
                style={{ animationDelay: `${1.2 + index * 0.12}s` }}
              >
                <div className="cert-header">
                  <FontAwesomeIcon icon={faAward} className="award-icon" style={{ color }} />
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="cert-link"
                      title={t('certificates.link')}
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  )}
                </div>

                <div className="cert-institution">{cert.institution}</div>
                <h2>{cert.title}</h2>
                <p className="cert-desc">{t('certificates.descs')[index]}</p>

                <div className="cert-footer">
                  <span className="cert-date">{cert.date}</span>
                  <span
                    className="cert-badge"
                    style={{ color, borderColor: `${color}55` }}
                  >
                    {cert.category}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Certificates
