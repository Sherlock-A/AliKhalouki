import { useEffect, useState } from 'react'

import {
  faArrowLeft,
  faChevronRight,
  faClock,
  faTag,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'
import { Link, useParams } from 'react-router-dom'

import AnimatedLetters from '../AnimatedLetters'
import SEO from '../SEO'
import './Article.scss'
import { ARTICLE_CONTENT } from './articles-data'

import { POSTS } from './index'

const Article = () => {
  const { slug } = useParams()
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const t = setTimeout(() => setLetterClass('text-animate-hover'), 2000)
    return () => clearTimeout(t)
  }, [])

  const meta    = POSTS.find((p) => p.slug === slug)
  const content = ARTICLE_CONTENT[slug]

  if (!meta || !content) {
    return (
      <div className="container blog-article-page">
        <div className="text-zone">
          <h1>Article introuvable</h1>
          <Link to="/blog" className="back-link">
            <FontAwesomeIcon icon={faArrowLeft} /> Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  const CATEGORY_COLORS = {
    'Développement': '#06B6D4',
    'Design':        '#e1306c',
    'DevOps':        '#7c3aed',
    'SEO':           '#2563EB',
    'Backend':       '#059669',
  }
  const color = CATEGORY_COLORS[meta.category] || '#06B6D4'

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.excerpt}
        path={`/blog/${meta.slug}`}
        type="article"
        article={{ date: meta.date, category: meta.category }}
      />
      <div className="container blog-article-page">
        <div className="text-zone">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/" className="breadcrumb-link">Ali Khalouki</Link>
            <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-sep" />
            <Link to="/blog" className="breadcrumb-link">Blog</Link>
            <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-sep" />
            <span className="breadcrumb-current">{meta.category}</span>
          </nav>
          <Link to="/blog" className="back-link">
            <FontAwesomeIcon icon={faArrowLeft} /> Blog
          </Link>
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={meta.title.split('').slice(0, 20)}
              idx={15}
            />
            <span>…</span>
          </h1>
          <div className="article-meta">
            <span className="article-badge" style={{ color, borderColor: `${color}55` }}>
              <FontAwesomeIcon icon={faTag} /> {meta.category}
            </span>
            <span className="article-date">
              <FontAwesomeIcon icon={faClock} /> {meta.date} · {meta.readTime} min
            </span>
          </div>
          <p className="article-excerpt">{meta.excerpt}</p>
          <Link to="/contact" className="flat-button article-cta">
            Discutons de votre projet
          </Link>
        </div>

        <div className="article-body">
          {content.map((block, i) => {
            if (block.type === 'h2')  return <h2 key={i}>{block.text}</h2>
            if (block.type === 'h3')  return <h3 key={i}>{block.text}</h3>
            if (block.type === 'p')   return <p  key={i}>{block.text}</p>
            if (block.type === 'ul')  return (
              <ul key={i}>{block.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
            )
            if (block.type === 'code') return (
              <pre key={i}><code>{block.text}</code></pre>
            )
            return null
          })}
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Article
