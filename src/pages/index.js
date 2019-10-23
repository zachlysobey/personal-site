import React from 'react'

import Layout from '../components/layout'
import BlogPostPreview from '../components/blog-post-preview'

export default ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark
    const blogPostsContent = posts
        .filter((post) => post.node.frontmatter.title.length > 0)
        .map(({ node }) => (
            <BlogPostPreview
                key={node.id}
                excerpt={node.excerpt}
                frontmatter={node.frontmatter}
            />
        ))
    return (
        <Layout>
            <div className="blog-posts">{blogPostsContent}</div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query IndexQuery {
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
