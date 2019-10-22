import React from 'react'
import Link from 'gatsby-link'

import Layout from '../components/layout'

const BlogPostPreview = ({ frontmatter, excerpt }) => (
    <div className="blog-post preview">
        <h2>
            <small className="date">{frontmatter.date}</small>{' '}
            <Link to={frontmatter.path}>{frontmatter.title}</Link>
        </h2>

        <p>{excerpt}</p>

        <ul className="tag-list">
            {(frontmatter.tags || []).map((tag, i) => (
                <li key={i}>#{tag}</li>
            ))}
        </ul>
    </div>
)

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
                        tags
                    }
                }
            }
        }
    }
`
