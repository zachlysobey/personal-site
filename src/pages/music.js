import React from 'react'
import Link from 'gatsby-link'

import Layout from '../components/layout'
import { YoutubePosts } from '../components/youtube-posts'
import { Bands } from '../components/bands'

export default () => (
    <Layout>
        <h2>Music</h2>

        <Bands />

        <YoutubePosts />

        <Link to="/">back home</Link>
    </Layout>
)
