import { useEffect, useState } from 'react'

import Loader from 'react-loaders'

import { useI18n } from '../../i18n'
import AnimatedLetters from '../AnimatedLetters'
import SEO from '../SEO'
import './index.scss'

// Photo served from /public — replace public/ali-photo.png with your actual photo
const ALI_PHOTO = process.env.PUBLIC_URL + '/ali-photo.png'

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
        description="Basé à Fès, Ali Khalouki est développeur web full-stack avec 3 ans d'expérience. React, Laravel, Node.js, DevOps. Découvrez son parcours."
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
        </div>

        <div className="photo-cont">
          <div className="photo-glow" />
          <div className="photo-ring photo-ring--1" />
          <div className="photo-ring photo-ring--2" />

          <div className="photo-frame">
            <div className="photo-scan" />
            <img
              src={ALI_PHOTO}
              alt="Ali Khalouki — Développeur Web Freelance à Fès, Maroc"
              className="photo-img"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="photo-meta">
            <span className="photo-name">Ali Khalouki</span>
            <span className="photo-loc">Fès, Maroc</span>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
