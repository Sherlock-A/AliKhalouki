import { useEffect, useState } from 'react'

import Loader from 'react-loaders'
import { Link } from 'react-router-dom'

import Logo from './Logo'
import LogoTitle from '../../assets/images/logo-s.png'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import styles from './index.scss'

const Home = () => {
  const [letterClass, setLetterClass] = useState('')

  const nameArray = 'oftware EngineerAli Khalouki'.split('')
  const jobArray = 'FullStack | DevOps'.split('')
  const interestArray = 'Business Analytics      Ux Designer'.split('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="text-zone" style={{ textAlign: 'center' }}>
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <img src={LogoTitle} alt="Sudip Banerjee" />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={15}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={22}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={interestArray}
              idx={22}
            />
          </h1>
          <h2>
            FullStack | DevOps | Business Analytics | Ux Designer
          </h2>
          <button className="centered-link" style={{ backgroundColor: 'green' }}>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>
              CONTACT ME
            </Link>
          </button>
        </div>
        <Logo />
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Home
