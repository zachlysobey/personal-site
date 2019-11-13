/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

    const query = `{
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 1000
        ) {
            edges {
                node {
                    frontmatter {
                        path
                    }
                }
            }
        }
    }`

    const result = await graphql(query)

    if (result.errors) {
        return Promise.reject(result.errors)
    }

    const edges = result.data.allMarkdownRemark.edges

    edges.forEach((edge) =>
        createPage({
            path: edge.node.frontmatter.path,
            component: blogPostTemplate,
            context: {},
        }),
    )
}
