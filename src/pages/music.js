import React from 'react'
import Link from 'gatsby-link'

import { YoutubePosts } from '../components/youtube-posts'
import { Bands } from '../components/bands'

export default () => (
    <div>
        <h2>Music</h2>

        <Bands />

        <YoutubePosts />

        <Link to="/">back home</Link>
    </div>
)
