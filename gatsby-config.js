const lost = require('lost')
const pxtorem = require('postcss-pxtorem')

const url = 'https://Koo-S.github.io'

module.exports = {
  siteMetadata: {
    url,
    siteUrl: url,
    title: 'Blog by Sangmo',
    subtitle:
      '앞으로 점점 더 좋아질 블로그',
    copyright: '© All rights reserved.',
    disqusShortname: '',
    menu: [
      {
        label: 'All',
        path: '/',
      },
      {
        label: 'AWS',
        path: '/categories/aws',
      },
      {
        label: 'Dev',
        path: '/categories/dev',
      },
      {
        label: 'About me',
        path: '/about/',
      },
      {
        label: '블로그 시작',
        path: '/start/',
      },
    ],
    author: {
      name: 'Sang Mo',
      email: 'rntkdah2005@gmail.com',
      github: 'smk009@naver.com',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                url
                title
                description: subtitle
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(edge =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.url + edge.node.fields.slug,
                  guid: site.siteMetadata.url + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              ),
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        layout
                        draft
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: 'UA-73379983-2' },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['roboto:400,400i,500,700'],
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          lost(),
          pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: [
              'font',
              'font-size',
              'line-height',
              'letter-spacing',
              'margin',
              'margin-top',
              'margin-left',
              'margin-bottom',
              'margin-right',
              'padding',
              'padding-top',
              'padding-left',
              'padding-bottom',
              'padding-right',
              'border-radius',
              'width',
              'max-width',
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
          }),
        ],
        precision: 8,
      },
    },
  ],
}
