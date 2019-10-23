import React from 'react'
import Link from 'gatsby-link'

import { Video } from './youtube-video'

export default ({ frontmatter, excerpt }) => (
    <div className="blog-post preview">
        <h2>
            <small className="date">{frontmatter.date}</small>{' '}
            <Link to={frontmatter.path}>{frontmatter.title}</Link>
        </h2>

        <p>{excerpt}</p>

        <Video id={frontmatter.youtube} width={'100%'} height={'210px'}></Video>

        <ul className="tag-list">
            {(frontmatter.tags || []).map((tag, i) => (
                <li key={i}>#{tag}</li>
            ))}
        </ul>
    </div>
)
