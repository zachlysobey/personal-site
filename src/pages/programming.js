import React from 'react'
import Link from 'gatsby-link'

import Layout from '../components/layout'
import { ExternalArticles } from '../components/external-articles'

export default () => (
    <Layout>
        <h2>Programming</h2>

        <ExternalArticles />

        <Link to="/">back home</Link>
    </Layout>
)
