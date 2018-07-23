import React from 'react'
import Helmet from 'react-helmet'

export default function Template({ data }) {
    const { markdownRemark: post } = data
    return (
        <div className="blog-post-container">
            <Helmet title={`Zach Lysobey - ${post.frontmatter.title}`} />
            <div className="blog-post">
                <h2>
                    <small>{post.frontmatter.date}</small>{' '}
                    {post.frontmatter.title}
                </h2>
                <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                />
            </div>
        </div>
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
            }
        }
    }
`
