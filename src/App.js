import { lazy, Suspense } from 'react'

import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import TopControls from './components/TopControls'
import { I18nProvider } from './i18n'
import { ThemeProvider } from './theme'
import './App.scss'
import './light-theme.scss'

const Home         = lazy(() => import('./components/Home'))
const About        = lazy(() => import('./components/About'))
const Blog         = lazy(() => import('./components/Blog'))
const BlogArticle  = lazy(() => import('./components/Blog/Article'))
const Certificates = lazy(() => import('./components/Certificates'))
const Contact      = lazy(() => import('./components/Contact'))
const Project      = lazy(() => import('./components/Project'))
const Services     = lazy(() => import('./components/Services'))
const Skills       = lazy(() => import('./components/Skills'))

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <TopControls />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/skills" element={<Skills />} />
            </Route>
          </Routes>
        </Suspense>
      </I18nProvider>
    </ThemeProvider>
  )
}

export default App
