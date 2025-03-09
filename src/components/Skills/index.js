import { useEffect, useState } from 'react'

import Loader from 'react-loaders'

import WordCloud from './wordcloud'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const Skills = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const skillsArray = 'Skills'.split('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container skills-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={skillsArray}
              idx={15}
            />
            <br />
          </h1>
          <p>
            Je suis Ali Khalouki, un développeur full-stack, designer UX et analyste d'affaires. J'ai une solide base à la fois en développement et en opérations, avec un accent sur la création de systèmes fluides et efficaces. Mon expérience comprend l'automatisation des processus de déploiement, la conception d'applications évolutives et le travail avec les technologies cloud pour fournir des solutions fiables.
          </p>
          <p>
            Mon ensemble de compétences couvre le DevOps, l'apprentissage automatique, le développement full-stack et l'infrastructure cloud. Je m'engage à rester à jour avec les dernières avancées et à affiner continuellement mon expertise pour relever efficacement les défis complexes.
          </p>
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
