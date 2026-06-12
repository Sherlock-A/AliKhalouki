import { useEffect, useState } from 'react'

import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'
import { Link } from 'react-router-dom'

import { useI18n } from '../../i18n'
import AnimatedLetters from '../AnimatedLetters'
import SEO from '../SEO'
import './index.scss'

const CATEGORY_COLORS = {
  'Développement': '#06B6D4',
  'Design':        '#e1306c',
  'DevOps':        '#7c3aed',
  'SEO':           '#2563EB',
  'Backend':       '#059669',
}

export const POSTS = [
  {
    slug: 'guide-developpeur-fullstack-2025',
    title: 'Comment Devenir Développeur Full-Stack : Le Guide Complet pour 2025',
    category: 'Développement',
    date: 'Jan 2025',
    readTime: 8,
    excerpt: "De HTML/CSS aux frameworks modernes : roadmap complète, ressources gratuites et conseils pratiques pour lancer votre carrière de développeur full-stack.",
    url: null,
  },
  {
    slug: 'prix-creation-site-web-maroc-2025',
    title: 'Prix Création Site Web au Maroc : 7 Facteurs Qui Révolutionnent le Budget 2025',
    category: 'Développement',
    date: 'Fév 2025',
    readTime: 6,
    excerpt: "Site vitrine, e-commerce, application sur mesure : comprendre les fourchettes de prix au Maroc et les critères qui font varier le devis de votre projet web.",
    url: null,
  },
  {
    slug: 'design-web-credibilite-marque',
    title: 'Pourquoi le Design Web est Crucial pour la Crédibilité de Votre Marque',
    category: 'Design',
    date: 'Mar 2025',
    readTime: 5,
    excerpt: "Un design soigné inspire confiance, réduit le taux de rebond et convertit mieux. Découvrez les principes clés d'un design web qui renforce votre image de marque.",
    url: null,
  },
  {
    slug: 'docker-cicd-deploiements',
    title: 'Docker et CI/CD : Automatiser Vos Déploiements de A à Z',
    category: 'DevOps',
    date: 'Avr 2025',
    readTime: 9,
    excerpt: "Créez des pipelines CI/CD robustes avec Docker et GitHub Actions. Du Dockerfile au déploiement automatisé, un guide pas-à-pas pour les développeurs.",
    url: null,
  },
  {
    slug: 'seo-maroc-strategies-2025',
    title: 'Référencement Naturel au Maroc : Les Stratégies Gagnantes en 2025',
    category: 'SEO',
    date: 'Mai 2025',
    readTime: 7,
    excerpt: "Optimisez votre visibilité sur Google.ma avec des techniques SEO éprouvées : audit technique, mots-clés locaux, netlinking et contenu à forte valeur ajoutée.",
    url: null,
  },
  {
    slug: 'laravel-vs-nodejs-api',
    title: 'Laravel 11 vs Node.js : Quel Framework Choisir pour Votre API ?',
    category: 'Backend',
    date: 'Juin 2025',
    readTime: 8,
    excerpt: "Comparatif détaillé entre Laravel 11 et Node.js/Express pour construire des APIs RESTful performantes : performances, écosystème, courbe d'apprentissage.",
    url: null,
  },
]

const POSTS_PER_PAGE = 3

const Blog = () => {
  const { t } = useI18n()
  const [letterClass, setLetterClass] = useState('text-animate')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 2000)
    return () => clearTimeout(timer)
  }, [])

  const totalPages = Math.ceil(POSTS.length / POSTS_PER_PAGE)
  const visiblePosts = POSTS.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <>
      <SEO
        title="Blog"
        description="Articles techniques sur le développement web au Maroc : React, Laravel, Docker, SEO. Conseils et retours d'expérience de freelance."
        path="/blog"
      />
      <div className="container blog-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={t('blog.title').split('')}
              idx={15}
            />
          </h1>
          <p>{t('blog.intro')}</p>
          <Link to="/contact" className="flat-button blog-cta">
            {t('blog.cta')}
          </Link>
        </div>

        <div className="blog-wrap">
          {visiblePosts.map((post, index) => {
            const color = CATEGORY_COLORS[post.category] || '#06B6D4'
            return (
              <div
                key={`${currentPage}-${index}`}
                className="blog-card"
                style={{ animationDelay: `${1.2 + index * 0.12}s` }}
              >
                <div className="blog-card-top">
                  <span
                    className="blog-badge"
                    style={{ color, borderColor: `${color}55` }}
                  >
                    {post.category}
                  </span>
                  {post.url && (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="blog-ext-link"
                      title={t('blog.readMore')}
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  )}
                </div>

                <h2>{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>

                <div className="blog-footer">
                  <span className="blog-meta">
                    {post.date} · {post.readTime} {t('blog.minRead')}
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="blog-read-more"
                    style={{ color }}
                  >
                    {t('blog.readMore')}&nbsp;<FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              </div>
            )
          })}

          {totalPages > 1 && (
            <div className="blog-pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={p === currentPage ? 'active' : ''}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <div className="blog-newsletter">
            <FontAwesomeIcon icon={faNewspaper} className="newsletter-icon" />
            <p className="newsletter-text">Recevoir les prochains articles</p>
            <a
              href="mailto:okhalouki47@gmail.com?subject=Newsletter%20Blog"
              className="newsletter-link"
            >
              S'abonner →
            </a>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Blog
