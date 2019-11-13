import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'

import Layout from '../components/layout'
import { Bands } from '../components/bands'
import BlogPostPreview from '../components/blog-post-preview'

export default ({ data }) => {
    const isPost = (post) => post.node.frontmatter.title.length > 0
    const posts = data.allMarkdownRemark.edges.filter(isPost)
    const isMusicPost = (post) =>
        post.node.frontmatter.tags &&
        post.node.frontmatter.tags.includes('music')
    const musicPosts = posts.filter(isMusicPost)

    return (
        <Layout>
            <Bands />

            <h2>#music</h2>

            <div className="blog-posts">
                {musicPosts.map(({ node }) => (
                    <BlogPostPreview
                        key={node.id}
                        excerpt={node.excerpt}
                        frontmatter={node.frontmatter}
                    />
                ))}
            </div>

            <Link to="/">back home</Link>
        </Layout>
    )
}

export const pageQuery = graphql`
    query MusicQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        path
                        youtube
                        tags
                    }
                }
            }
        }
    }
`
