module.exports = {
    siteMetadata: {
        title: 'Zach Lysobey',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: 'UA-29116435-1',
                head: false,
                anonymize: true,
                respectDNT: true,
                exclude: [],
                pageTransitionDelay: 0,
                // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
                // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
                // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
                sampleRate: 5,
                siteSpeedSampleRate: 10,
                cookieDomain: 'auto',
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/pages`,
                name: 'pages',
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    `gatsby-remark-autolink-headers`,
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: 'language-',
                            inlineCodeMarker: null,
                            aliases: {},
                        },
                    },
                ],
            },
        },
    ],
}
