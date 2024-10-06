import { Helmet } from 'react-helmet'

function MetaTags(props) {
    const { title, description, keywords } = props
    
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Helmet>
        </div>
    )
}

export default MetaTags