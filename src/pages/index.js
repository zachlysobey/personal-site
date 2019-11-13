import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import BlogPostPreview from '../components/blog-post-preview'
import asideStyles from '../components/aside.module.css'

export default ({ data }) => {
    const isPost = (post) => post.node.frontmatter.title.length > 0
    const blogPostsContent = data.allMarkdownRemark.edges
        .filter(isPost)
        .map(({ node }) => (
            <BlogPostPreview
                key={node.id}
                excerpt={node.excerpt}
                frontmatter={node.frontmatter}
            />
        ))
    return (
        <Layout>
            <div className={asideStyles.aside}>
                <img
                    alt=""
                    src="./zach-mustache-mountain.jpg"
                    style={{ float: 'right', paddingLeft: '1em' }}
                />
                <h2>Hello World!</h2>
                <p>
                    I don't really advertise the existence of this blog, nor do
                    I have anyone visiting it, and as such, I have not had much
                    motivation to keep the quality very high.
                </p>
                <p>
                    <strong>Here be dragons. </strong>
                    Expect to see incomplete work, un-editted prose, and
                    half-baked ideas below.
                </p>
                <p>
                    That said, I've been putting more work into it lately, and
                    it may yet become something that I am proud of. Stay tuned!
                </p>
            </div>
            <div className="blog-posts">{blogPostsContent}</div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { draft: { ne: true } } }
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
