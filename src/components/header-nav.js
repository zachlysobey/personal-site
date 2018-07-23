import React from 'react'
import Link from 'gatsby-link'

import './header-nav.css'

const navItems = [
    {
        name: 'Music',
        link: '/music',
    },
    {
        name: 'Programming',
        link: '/programming',
    },
    {
        name: 'Blog',
        link: '/blog',
    },
]

export const HeaderNav = () => (
    <nav>
        <ul>
            {navItems.map(({ name, link }, i) => (
                <li key={i}>
                    <Link to={link}>{name}</Link>
                </li>
            ))}
        </ul>
    </nav>
)
