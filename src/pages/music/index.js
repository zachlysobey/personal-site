import React from "react"
import Link from "gatsby-link"

import { YoutubePosts } from './youtube-posts'
import { Bands } from './bands'

export default () => (
    <div>
        <h2>Music</h2>

        <YoutubePosts></YoutubePosts>

        <Bands></Bands>

        <Link to="/">back home</Link>
    </div>
)
