import { Helmet } from 'react-helmet-async'

const BASE_TITLE = 'Ali Khalouki — Développeur Web Freelance Maroc'
const BASE_URL   = 'https://ali-khalouki.com'
const BASE_IMAGE = `${BASE_URL}/ali-photo.png`

const SEO = ({ title, description, path = '/', type = 'website', article }) => {
  const fullTitle = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE
  const canonical = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:type"        content={type} />
      <meta property="og:image"       content={BASE_IMAGE} />

      {/* Twitter */}
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Article meta */}
      {article && <meta property="article:published_time" content={article.date} />}
      {article && <meta property="article:section"        content={article.category} />}
    </Helmet>
  )
}

export default SEO
