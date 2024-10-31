import { Helmet } from 'react-helmet-async'

function MetaTags({title, description, keywords, ogimage}) {

  return (
      <Helmet>
        <title>{title}</title>
        <meta name='keywords' content={keywords}/>
        <meta property="og:title" content={title}/>
        <meta name="description" content={description}/>
        <meta property="og:description" content={description}/>
        <meta property="og:image" content={ogimage}/>
        <meta
            property="og:url"
            content={ogimage}
        />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image:alt" content="summary_large_image"/>
        <meta name="twitter:site" content="@filmynewsnetwork"/>
      </Helmet>
  )
}

export default MetaTags
