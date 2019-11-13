import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import { Video } from '../components/youtube-video'

export default function Template({ data }) {
    const { markdownRemark: post } = data
    const youtubeId = post.frontmatter.youtube
    console.log({ frontmatter: post.frontmatter })

    return (
        <Layout>
            <div className="blog-post-container">
                <Helmet title={`Zach Lysobey - ${post.frontmatter.title}`} />
                <div className="blog-post">
                    <h2>
                        <small className="date">{post.frontmatter.date}</small>{' '}
                        {post.frontmatter.title}
                    </h2>
                    <div
                        className="blog-post-content"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                    <div style={{ height: '480px', width: '640px' }}>
                        <Video
                            id={youtubeId}
                            width={'640px'}
                            height={'420px'}
                        ></Video>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
                tags
                youtube
            }
        }
    }
`
