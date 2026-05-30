import { useEffect, useState } from 'react'

import Loader from 'react-loaders'

import WordCloud from './wordcloud'
import { useI18n } from '../../i18n'
import AnimatedLetters from '../AnimatedLetters'
import SEO from '../SEO'
import './index.scss'

const Skills = () => {
  const { t } = useI18n()
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <SEO
        title="Compétences"
        description="Compétences techniques : React, Next.js, Laravel, Node.js, Docker, CI/CD, MySQL, MongoDB, Linux. Développeur Full Stack & DevOps au Maroc."
        path="/skills"
      />
      <div className="container skills-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={t('skills.title').split('')}
              idx={15}
            />
            <br />
          </h1>
          <p>{t('skills.p1')}</p>
          <p>{t('skills.p2')}</p>
        </div>

        <div className="tagcloud-wrap">
          <WordCloud />
        </div>
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Skills
