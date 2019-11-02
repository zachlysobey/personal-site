module.exports = {
    siteMetadata: {
        title: 'Zach Lysobey',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
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
        {
            resolve: `gatsby-source-twitter`,
            options: {
                credentials: {
                    consumer_key: 'UecmSiOhE5ORhoWWQy8pbH1jTaGjFfdHcJX19DjH',
                    consumer_secret:
                        'Kp9VSjG0rMLLhDcIIdRdajRiHPzV6DXjtrkjIRswu86u3',
                    bearer_token:
                        'AAAAAAAAAAAAAAAAAAAAAAzQAQEAAAAAC5R3weUL0T4%2FZ6HFj%2FILHx9fHJc%3DpN3i4Lzp5gnhYnC5hLEdtUO6NkGU1LC6SbbqVupqYPSjf9ShDZ',
                },
                queries: {
                    myTweets: {
                        endpoint: 'statuses/user_timeline',
                        params: {
                            screen_name: 'zlysobey',
                            include_rts: true,
                            exclude_replies: true,
                            tweet_mode: 'extended',
                        },
                    },
                },
            },
        },
    ],
}
