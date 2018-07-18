import React from 'react'
import Link from 'gatsby-link'

import { ExternalArticles } from '../components/external-articles'

export default () => (
  <div>
    <h2>Programming</h2>

    <ExternalArticles />

    <Link to="/">back home</Link>
  </div>
)
