import React from 'react'
import Link from 'gatsby-link'

import githubLogo from '../images/GitHub-Logos/GitHub_Logo_White.png'

const Header = ({ siteTitle }) => (
    <div
        style={{
            background: 'rebeccapurple',
            marginBottom: '1.45rem',
        }}
    >
        <div
            style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '1.45rem 1.0875rem',
            }}
        >
            <h1 style={{ margin: 0 }}>
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
        </div>

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
)

export default Header
