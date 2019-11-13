import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'

import Layout from '../components/layout'
import BlogPostPreview from '../components/blog-post-preview'

export default ({ data }) => {
    const posts = data.allMarkdownRemark.edges
    return (
        <Layout>
            <h2>(DRAFTS)</h2>
            <div className="blog-posts">
                {posts.map(({ node }) => (
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
    query DraftsQuery {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { draft: { eq: true } } }
        ) {
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
                        draft
                    }
                }
            }
        }
    }
`
