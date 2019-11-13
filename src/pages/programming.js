import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'

import Layout from '../components/layout'
import { ExternalArticles } from '../components/external-articles'
import BlogPostPreview from '../components/blog-post-preview'

export default ({ data }) => {
    const isPost = (post) => post.node.frontmatter.title.length > 0
    const programmingPosts = data.allMarkdownRemark.edges.filter(isPost)
    return (
        <Layout>
            <ExternalArticles />
            <h2>#programming</h2>
            <div className="blog-posts">
                {programmingPosts.map(({ node }) => (
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
    query ProgrammingQuery {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: {
                frontmatter: {
                    draft: { ne: true }
                    tags: { in: "programming" }
                }
            }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        path
                        tags
                        draft
                    }
                }
            }
        }
    }
`
