import React from 'react'

import { Video } from '../components/yt-video'

import data from '../data'

import './youtube-posts.css'

export const YoutubePosts = () => (
    <div className="youtube-posts">
        <h3>Daily Youtube Posts</h3>

        <p>
            I'm gonna try to post a new YouTube video every day. It'll be mostly
            original stuff but mostly just ideas and song fragments. The goal is
            to start producing
            <em> something</em> everyday at least.
        </p>

        <ul style={{ listStyleType: 'none' }}>
            {data.youtubePosts.reverse().map(({ id, title }, i) => (
                <li key={i}>
                    <h4>{title}</h4>
                    <p style={{ float: 'right' }}>
                        <a href={'https://youtu.be/' + id} title={title}>
                            {'https://youtu.be/' + id}
                        </a>
                    </p>
                    <Video id={id} />
                </li>
            ))}
        </ul>
    </div>
)
