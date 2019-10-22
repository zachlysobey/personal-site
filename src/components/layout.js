import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Headroom from 'react-headroom'

import Header from './header'

import './layout.css'
import './blog-post.css'

// import 'prismjs/themes/prism.css'
// import 'prismjs/themes/prism-tomorrow.css'
// import 'prismjs/themes/prism-coy.css'
// import 'prismjs/themes/prism-dark.css'
// import 'prismjs/themes/prism-funky.css'
import 'prismjs/themes/prism-okaidia.css'
// import 'prismjs/themes/prism-solarizedlight.css'

const Layout = ({ children, data }) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `}
        render={(data) => (
            <>
                <Helmet
                    title={data.site.siteMetadata.title}
                    meta={[
                        { name: 'description', content: 'Sample' },
                        { name: 'keywords', content: 'sample, something' },
                    ]}
                />
                <Headroom>
                    <Header siteTitle={data.site.siteMetadata.title} />
                </Headroom>
                <div
                    style={{
                        margin: '1.45rem auto 0',
                        maxWidth: 960,
                        padding: '0px 1.0875rem 1.45rem',
                        paddingTop: 0,
                    }}
                >
                    {children}
                </div>
            </>
        )}
    />
)

Layout.propTypes = {
    children: PropTypes.element,
}

export default Layout
