import { useEffect, useState } from 'react'

import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faFolder,
  faLock,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import { useI18n } from '../../i18n'
import AnimatedLetters from '../AnimatedLetters'
import SEO from '../SEO'
import './index.scss'

const projects = [
  {
    title: 'Cadex',
    url: null,
    descKey: 'Site corporate WordPress/Elementor pour Cadex, Casablanca. Animations GSAP, SEO Yoast, CDN Cloudflare, performance LiteSpeed.',
    tags: ['WordPress', 'Elementor', 'PHP', 'MySQL', 'GSAP', 'Cloudflare', 'Yoast SEO', 'Bootstrap'],
    badge: 'private',
  },
  {
    title: 'Jobly',
    url: 'https://jobly.ma',
    descKey: "Plateforme d'emploi marocaine — publication d'offres, candidature en ligne et matching. Stack TypeScript + Laravel (Blade).",
    tags: ['TypeScript', 'Laravel', 'PHP', 'Blade', 'MySQL', 'Shell'],
    badge: null,
  },
  {
    title: 'High Farming ERP',
    url: null,
    descKey: "Système ERP privé pour High Farming à Fès. Gestion des opérations agricoles : stocks, planification, RH et reporting.",
    tags: ['Laravel', 'MySQL', 'PHP', 'UML'],
    badge: 'private',
  },
  {
    title: 'Bait El Khalil',
    url: 'https://baitelkhalil.ma',
    descKey: 'Site immobilier élégant pour Bait El Khalil. Galerie photo, formulaire de contact et design entièrement responsive.',
    tags: ['WordPress', 'CSS3', 'SEO', 'Responsive'],
    badge: null,
  },
  {
    title: 'Isla Joya',
    url: null,
    descKey: 'Grossiste en bijouterie — joyas modernas y femeninas, calidad premium. Livraison sur tout le Maroc et Barcelone. Commerce social avec commandes en message privé.',
    tags: ['E-commerce', 'Social', 'Maroc', 'Espagne'],
    badge: 'social',
  },
  {
    title: 'AI Marketing Agents',
    url: null,
    descKey: "Système multi-agents IA pour l'automatisation marketing : génération de contenu, analyse de campagnes, scheduling et reporting autonome.",
    tags: ['Python', 'LangChain', 'OpenAI', 'Automation'],
    badge: 'private',
  },
]

const Project = () => {
  const { t } = useI18n()
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <SEO
        title="Projets"
        description="Portfolio de réalisations web d'Ali Khalouki : sites vitrines, e-commerce, applications React/Laravel, DevOps. Projets au Maroc et à l'international."
        path="/projects"
      />
      <div className="container projects-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={t('projects.title').split('')}
              idx={15}
            />
          </h1>
          <p>{t('projects.intro')}</p>
        </div>
        <div className="projects-wrap">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              style={{ animationDelay: `${1.2 + index * 0.15}s` }}
            >
              <div className="project-header">
                <FontAwesomeIcon
                  icon={
                    project.badge === 'private' ? faLock
                    : project.badge === 'social' ? faInstagram
                    : faFolder
                  }
                  className={`folder-icon${
                    project.badge === 'private' ? ' folder-icon--private'
                    : project.badge === 'social'  ? ' folder-icon--social'
                    : ''
                  }`}
                />
                <div className="project-links">
                  {project.badge === 'private' ? (
                    <span className="badge-private">
                      <FontAwesomeIcon icon={faLock} /> {t('projects.private')}
                    </span>
                  ) : project.badge === 'social' ? (
                    <span className="badge-social">
                      <FontAwesomeIcon icon={faInstagram} /> {t('projects.social')}
                    </span>
                  ) : (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                      title={`Voir ${project.title}`}
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  )}
                </div>
              </div>
              <h2>{project.title}</h2>
              <p>{project.descKey}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Project
