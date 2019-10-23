import React from 'react'
import Link from 'gatsby-link'

import './header-nav.css'

const navItems = [
    {
        name: '/root',
        link: '/',
    },
    {
        name: '#music',
        link: '/music',
    },
    {
        name: '#programming',
        link: '/programming',
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
