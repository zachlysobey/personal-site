import React from 'react'

import * as data from '../data'

import asideStyles from './aside.module.css'

export const ExternalArticles = () => (
    <div className={asideStyles.aside}>
        <h3>External Articles</h3>

        <p>Articles and things I've written that are hosted elsewhere.</p>

        <ul>
            {data.externalArticles.map(({ url, title }, i) => (
                <li key={i}>
                    <h4>
                        <a href={url} title={title}>
                            (Lifion Engineering Blog) {title}
                        </a>
                    </h4>
                </li>
            ))}
        </ul>
    </div>
)
