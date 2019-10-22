import React from 'react'
import Link from 'gatsby-link'

import Layout from '../components/layout'
import { ExternalArticles } from '../components/external-articles'
import BlogPostPreview from '../components/blog-post-preview'

export default ({ data }) => {
    const isPost = (post) => post.node.frontmatter.title.length > 0
    const posts = data.allMarkdownRemark.edges.filter(isPost)
    const isProgrammingPost = (post) =>
        post.node.frontmatter.tags &&
        post.node.frontmatter.tags.includes('programming')
    const programmingPosts = posts.filter(isProgrammingPost)
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
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        path
                        tags
                    }
                }
            }
        }
    }
`
