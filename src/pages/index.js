import React from 'react'
import Link from 'gatsby-link'

import Layout from '../components/layout'

export default () => (
    <Layout>
        <h2>My new home on the Internet</h2>

        <p>Playing around with creating a new site using Gatsby.js</p>

        <ul>
            <li>
                <Link to="/music/">Music</Link>
            </li>
            <li>
                <Link to="/programming/">Programming</Link>
            </li>
            <li>
                <Link to="/blog/">Blog</Link>
            </li>
        </ul>
    </Layout>
)
