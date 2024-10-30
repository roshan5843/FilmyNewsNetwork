import { Helmet } from 'react-helmet'

function MetaTags(props) {
  const { title, description, keywords, ogimage } = props

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta
          property='og:image'
          content={ogimage}
        />
        <meta property='og:url' content={ogimage} />
        <meta property='og:type' content='website' />
      </Helmet>
    </div>
  )
}

export default MetaTags
