import React from 'react'
import Link from 'gatsby-link'

import Layout from '../components/layout'

export default ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            <div className="blog-posts">
                {posts
                    .filter((post) => post.node.frontmatter.title.length > 0)
                    .map(({ node }) => {
                        const { frontmatter, id, excerpt } = node
                        const { date, path, title, tags } = frontmatter
                        return (
                            <div className="blog-post preview" key={id}>
                                <h2>
                                    <small className="date">{date}</small>{' '}
                                    <Link to={path}>{title}</Link>
                                </h2>

                                <p>{excerpt}</p>

                                <ul className="tag-list">
                                    <span></span>
                                    {(tags || []).map((tag, i) => (
                                        <li key={i}>#{tag}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
            </div>
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
