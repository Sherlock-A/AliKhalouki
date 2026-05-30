import React, { useEffect, useState } from 'react'

import TagCloud from 'TagCloud'

const WordCloud = () => {
  const [isLoading, setLoad] = useState(true)

  const container = '.content'
  const texts = [
    // Frontend
    'HTML5',
    'CSS3',
    'JS',
    'TypeScript',
    'React',
    'Next.js',
    'Tailwind',
    'Bootstrap',
    'GSAP',
    'Framer',
    'Three.js',
    // Backend
    'Node.js',
    'Express',
    'PHP',
    'Laravel',
    'JWT',
    'REST API',
    // Database
    'MongoDB',
    'MySQL',
    'SQL',
    // Systems & Network
    'Linux',
    'WinServer',
    'VMware',
    'DNS',
    'TCP/IP',
    'Active Dir.',
    // DevOps & Tools
    'Docker',
    'CI/CD',
    'Git',
    'GitHub',
    'Postman',
    'Figma',
    // Analysis
    'UML',
    'Merise',
  ]

  const options = {
    radius: 300,
    maxSpeed: 'normal',
    initSpeed: 'normal',
    direction: 135,
    keep: true,
  }

  useEffect(() => {
    if (isLoading) {
      TagCloud(container, texts, options)
      setLoad(false)
    }
  }, [])

  return (
    <div className="main">
      <span className="content"></span>
    </div>
  )
}

export default WordCloud
