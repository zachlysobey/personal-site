import React from 'react'
import Link from 'gatsby-link'

import githubLogo from '../images/GitHub-Logos/GitHub_Logo_White.png'

import { HeaderNav } from './header-nav'

const Header = ({ siteTitle }) => (
    <header
        style={{
            background: 'rebeccapurple',
            marginBottom: '1.45rem',
        }}
    >
        <div
            style={{
                position: 'relative',
                margin: '0 auto',
                maxWidth: 960,
                padding: '1.45rem 1.0875rem',
            }}
        >
            <h1
                style={{
                    margin: 0,
                    display: 'inline-block',
                    textShadow: '#000 2px 2px 4px',
                }}
            >
                <Link
                    to="/"
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                    }}
                >
                    {siteTitle}
                </Link>
            </h1>

            <HeaderNav />

            <a href="https://github.com/zachlysobey/personal-site">
                <img
                    src={githubLogo}
                    width="80px"
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '.5em',
                        transform: 'rotate(45deg)',
                    }}
                />
            </a>
        </div>
    </header>
)

export default Header
