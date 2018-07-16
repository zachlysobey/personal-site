import React from 'react'
import Link from 'gatsby-link'

export default () => (
  <div>
    <h2>My new home on the Internet</h2>

    <p>Playing around with creating a new site using Gatsby.js</p>

    <ul>
      <li>
        <Link to="/music/">Music</Link>
      </li>
      <li>
        <Link to="/programming/">Programming</Link>
      </li>
    </ul>
  </div>
)
