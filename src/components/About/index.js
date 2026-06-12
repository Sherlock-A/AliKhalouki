import { useEffect, useState } from 'react'

import {
  faBolt,
  faCircleCheck,
  faCommentDots,
  faLayerGroup,
  faShieldHalved,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import { useI18n } from '../../i18n'
import AnimatedLetters from '../AnimatedLetters'
import SEO from '../SEO'
import './index.scss'

const ALI_PHOTO_PNG  = process.env.PUBLIC_URL + '/ali-photo.png'
const ALI_PHOTO_WEBP = process.env.PUBLIC_URL + '/ali-photo.webp'

const FA_ICONS = {
  'layer-group': faLayerGroup,
  'bolt': faBolt,
  'comment-dots': faCommentDots,
  'shield-halved': faShieldHalved,
}

const TESTIMONIALS = [
  {
    name: 'Responsable Marketing',
    role: 'Cadex — Casablanca',
    text: 'Ali a livré notre site corporate en moins de 3 semaines. Score Lighthouse au-dessus de 90, et on a nettement amélioré notre visibilité en ligne dès le premier mois.',
    stars: 5,
  },
  {
    name: 'Fondateur',
    role: 'Jobly.ma',
    text: 'Excellent travail sur la plateforme emploi. Code maintenable, livré dans les délais, et Ali est resté disponible après la livraison — rare chez un freelance.',
    stars: 5,
  },
  {
    name: 'Gérant',
    role: 'Bait El Khalil',
    text: 'Site immobilier propre et rapide. On reçoit maintenant des demandes de contact directement via le formulaire. Je recommande sans hésiter.',
    stars: 5,
  },
]

const About = () => {
  const { t } = useI18n()
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <SEO
        title="À Propos"
        description="Basé à Casablanca, Ali Khalouki est développeur web full-stack avec 3 ans d'expérience. React, Laravel, Node.js, DevOps. Découvrez son parcours."
        path="/about"
      />
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={t('about.title').split('')}
              idx={15}
            />
          </h1>
          <p className="about-tagline">{t('about.tagline')}</p>
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>

          {/* Pourquoi Ali ? */}
          <div className="why-ali">
            {t('about.whyAli').map((item, i) => (
              <div key={i} className="why-item">
                <FontAwesomeIcon icon={FA_ICONS[item.icon]} className="why-icon" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Témoignages */}
          <div className="testimonials-block">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <FontAwesomeIcon key={s} icon={faStar} />
                  ))}
                  <FontAwesomeIcon icon={faCircleCheck} className="testimonial-verified" />
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <span className="testimonial-name">— {t.name}</span>
                  <span className="testimonial-role">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="photo-cont">
          <div className="photo-glow" />
          <div className="photo-ring photo-ring--1" />
          <div className="photo-ring photo-ring--2" />

          <div className="photo-frame">
            <div className="photo-scan" />
            <picture>
              <source srcSet={ALI_PHOTO_WEBP} type="image/webp" />
              <img
                src={ALI_PHOTO_PNG}
                alt="Ali Khalouki — Développeur Web Freelance à Casablanca, Maroc"
                className="photo-img"
                width="210"
                height="210"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div className="photo-meta">
            <span className="photo-name">Ali Khalouki</span>
            <span className="photo-loc">Casablanca, Maroc</span>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
