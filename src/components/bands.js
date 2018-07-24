import React from 'react'

import * as data from '../data'

export const Bands = () => (
    <div>
        <h3>Bands I've Been in</h3>

        <ul>
            {data.bands.map(({ url, title }, i) => (
                <li key={i}>
                    <h4>
                        <a href={url} title={title}>
                            {title}
                        </a>
                    </h4>
                </li>
            ))}
        </ul>
    </div>
)
