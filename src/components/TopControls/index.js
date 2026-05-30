import { useRef, useState } from 'react'

import {
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled, { keyframes } from 'styled-components'

import music from '../../assets/sounds/fake_verthandi.mp3'
import { LANGS, useI18n } from '../../i18n'
import { useTheme } from '../../theme'
import { FlagDE, FlagES, FlagFR, FlagGB } from '../AkMark/FlagIcon'
import './index.scss'

const play = keyframes`
  0%   { transform: scaleY(1); }
  50%  { transform: scaleY(2.2); }
  100% { transform: scaleY(1); }
`

const Bar = styled.span`
  background: #06B6D4;
  display: inline-block;
  width: 3px;
  height: 20px;
  margin: 0 1.5px;
  border-radius: 1px;
  animation: ${play} 0.9s ease infinite;
  animation-play-state: ${(p) => (p.$playing ? 'running' : 'paused')};
`

const FLAGS = { fr: FlagFR, en: FlagGB, es: FlagES, de: FlagDE }
const DELAYS = ['0.1s', '0.25s', '0.4s', '0.25s', '0.1s']

const TopControls = () => {
  const { lang, changeLang } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const handleMusic = () => {
    setPlaying((p) => {
      if (!p) audioRef.current.play()
      else audioRef.current.pause()
      return !p
    })
  }

  return (
    <div className="top-controls">
      {/* Language flags */}
      <div className="tc-langs">
        {LANGS.map((l) => {
          const Flag = FLAGS[l]
          return (
            <button
              key={l}
              className={`tc-lang${lang === l ? ' tc-lang--active' : ''}`}
              onClick={() => changeLang(l)}
              title={l.toUpperCase()}
            >
              <Flag />
            </button>
          )
        })}
      </div>

      {/* Divider */}
      <span className="tc-sep" />

      {/* Theme toggle */}
      <button className="tc-theme" onClick={toggleTheme} title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}>
        <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
      </button>

      {/* Divider */}
      <span className="tc-sep" />

      {/* Soundbar */}
      <div className="tc-music" onClick={handleMusic} title={playing ? 'Pause' : 'Play music'}>
        <span className="tc-music-tag">&lt;music&gt;</span>
        <div className="tc-bars">
          {DELAYS.map((d, i) => (
            <Bar key={i} $playing={playing} style={{ animationDelay: d }} />
          ))}
        </div>
        <span className="tc-music-tag">&lt;music/&gt;</span>
        <audio ref={audioRef} src={music} loop />
      </div>
    </div>
  )
}

export default TopControls
