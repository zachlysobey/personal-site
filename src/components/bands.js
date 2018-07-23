import React from 'react'

import data from '../data'

export const Bands = () => (
    <div>
        <h3>Bands I've Been in</h3>

        <ul>
            {data.bands.map(({ url, title }, i) => (
                <li key={i}>
                    <h4>{title}</h4>
                    <p>
                        <a href={url} title={title}>
                            {url}
                        </a>
                    </p>
                </li>
            ))}
        </ul>
    </div>
)
