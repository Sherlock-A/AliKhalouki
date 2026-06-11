import { useEffect, useState } from 'react'

import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faFolder,
  faHammer,
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
    title: 'Dunaria',
    url: 'https://dunaria.vercel.app',
    descKey: 'Guide de voyage désert du Sahara au Maroc — itinéraires privés, 12+ destinations, blog 55+ articles, PDF téléchargeable, intégration WhatsApp et support multilingue (ES/EN/FR).',
    tags: ['Next.js', 'SEO', 'i18n', 'WhatsApp', 'Responsive', 'Multi-langue', 'Vercel'],
    outcome: '500+ voyageurs · 4.9/5 ⭐ · 55+ articles · 3 langues',
    sector: 'Tourisme / Voyage',
    year: '2025',
    badge: null,
  },
  {
    title: 'Portfolio Personnel',
    url: 'https://alikhalouki.vercel.app',
    descKey: "Portfolio interactif full-stack avec animations CSS/GSAP, thème clair/sombre, i18n 4 langues (FR/EN/ES/DE), formulaire EmailJS, carte Leaflet et déploiement CI/CD sur Vercel.",
    tags: ['React', 'SCSS', 'EmailJS', 'Leaflet', 'FontAwesome', 'i18n', 'Vercel', 'GitHub Actions', 'React Router', 'Animate.css'],
    outcome: 'Score Lighthouse 95+ · i18n 4 langues · CI/CD automatisé',
    sector: 'Tech personnel',
    year: '2025',
    badge: null,
  },
  {
    title: 'Cadex',
    url: null,
    descKey: 'Site corporate WordPress/Elementor pour Cadex, Casablanca. Animations GSAP, SEO Yoast, CDN Cloudflare, performance LiteSpeed.',
    tags: ['WordPress', 'Elementor', 'PHP', 'MySQL', 'GSAP', 'Cloudflare', 'Yoast SEO', 'Bootstrap'],
    outcome: 'Livré en 2 semaines · Trafic organique ×2 en 2 mois',
    sector: 'Corporate',
    year: '2024',
    badge: 'private',
  },
  {
    title: 'Jobly',
    url: 'https://jobly.ma',
    descKey: "Plateforme d'emploi marocaine — publication d'offres, candidature en ligne et matching. Stack TypeScript + Laravel (Blade).",
    tags: ['TypeScript', 'Laravel', 'PHP', 'Blade', 'MySQL', 'Shell'],
    outcome: '500+ offres publiées · Architecture scalable Laravel + TS',
    sector: 'Emploi / RH',
    year: '2024',
    badge: null,
  },
  {
    title: 'High Farming ERP',
    url: null,
    descKey: "Système ERP privé pour High Farming à Fès. Gestion des opérations agricoles : stocks, planification, RH et reporting.",
    tags: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap', 'jQuery', 'REST API', 'Chart.js', 'UML', 'Merise'],
    outcome: '5 modules · Gestion complète adoptée par toute l\'équipe',
    sector: 'Agriculture / ERP',
    year: '2023',
    badge: 'private',
  },
  {
    title: 'Bait El Khalil',
    url: 'https://baitelkhalil.ma',
    descKey: 'Site immobilier élégant pour Bait El Khalil. Galerie photo, formulaire de contact et design entièrement responsive.',
    tags: ['WordPress', 'CSS3', 'SEO', 'Responsive'],
    outcome: 'Leads via formulaire dès la 1ère semaine de mise en ligne',
    sector: 'Immobilier',
    year: '2023',
    badge: null,
  },
  {
    title: 'Isla Joya',
    url: null,
    descKey: 'Grossiste en bijouterie — joyas modernas y femeninas, calidad premium. Livraison sur tout le Maroc et Barcelone. Commerce social avec commandes en message privé.',
    tags: ['E-commerce', 'Social', 'Maroc', 'Espagne'],
    outcome: 'Commerce social actif · Livraisons Maroc + Espagne',
    sector: 'Bijouterie / E-commerce',
    year: '2023',
    badge: 'social',
  },
  {
    title: 'AI Marketing Agents',
    url: null,
    descKey: "Système multi-agents IA pour l'automatisation marketing : génération de contenu, analyse de campagnes, scheduling et reporting autonome.",
    tags: ['Python', 'LangChain', 'OpenAI', 'Automation'],
    outcome: 'Automatisation 80% des tâches marketing récurrentes',
    sector: 'IA / Marketing',
    year: '2025',
    badge: 'private',
  },
  {
    title: 'Richmen Game for Palestine',
    url: null,
    descKey: "Jeu de plateau Monopoly moderne en ligne — achat de propriétés, négociations, transactions et parties multijoueur en temps réel. En cours de réalisation.",
    tags: ['Phaser.js', 'TypeScript', 'Socket.io', 'Node.js', 'WebGL', 'Canvas', 'REST API', 'Webpack'],
    outcome: 'En cours · Multijoueur temps réel · WebGL + Socket.io',
    sector: 'Gaming / Social',
    year: '2025',
    badge: 'wip',
  },
]

const PAGE_SIZE = 4

const Project = () => {
  const { t } = useI18n()
  const [letterClass, setLetterClass] = useState('text-animate')
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(projects.length / PAGE_SIZE)
  const visible = projects.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

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
          <div className="project-grid">
            {visible.map((project, index) => (
              <div
                key={page * PAGE_SIZE + index}
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-header">
                  <FontAwesomeIcon
                    icon={
                      project.badge === 'private' ? faLock
                      : project.badge === 'social'  ? faInstagram
                      : project.badge === 'wip'     ? faHammer
                      : faFolder
                    }
                    className={`folder-icon${
                      project.badge === 'private' ? ' folder-icon--private'
                      : project.badge === 'social'  ? ' folder-icon--social'
                      : project.badge === 'wip'     ? ' folder-icon--wip'
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
                    ) : project.badge === 'wip' ? (
                      <span className="badge-wip">
                        <FontAwesomeIcon icon={faHammer} /> En cours
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
                {(project.sector || project.year) && (
                  <div className="project-meta">
                    {project.sector && <span className="project-sector">{project.sector}</span>}
                    {project.year   && <span className="project-year">{project.year}</span>}
                  </div>
                )}
                <p>{project.descKey}</p>
                {project.outcome && (
                  <div className="project-outcome">
                    <span className="outcome-arrow">→</span>
                    <span>{project.outcome}</span>
                  </div>
                )}
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setPage(p => p - 1)}
                disabled={page === 0}
              >
                ←
              </button>
              <span className="pagination-info">{page + 1} / {totalPages}</span>
              <button
                className="pagination-btn"
                onClick={() => setPage(p => p + 1)}
                disabled={page === totalPages - 1}
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Project
