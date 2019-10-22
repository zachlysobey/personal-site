import React from 'react'
import Link from 'gatsby-link'

import githubLogo from '../images/GitHub-Logos/GitHub_Logo_White.png'

import { HeaderNav } from './header-nav'

import './header.css'

const Header = ({ siteTitle }) => (
    <header className="site-header">
        <div className="header-body">
            <h1>
                <Link to="/" className="header-link">
                    {siteTitle}
                </Link>
            </h1>

            <HeaderNav />

            <a
                className="github-link"
                href="https://github.com/zachlysobey/personal-site"
            >
                <img src={githubLogo} alt="GitHub" />
            </a>
        </div>
    </header>
)

export default Header
