/**
 * This the main entry file for Gatsby.
 * In here we can set Global Variables, Configureation, and Setup
 * the rest of the project to use TypeScript
 */

const pkg = require("./package.json");
const dotenv = require("dotenv");
const { generateConfig } = require("gatsby-plugin-ts-config");

dotenv.config({ path: ".env" });

const sanityConfig = {
    // this is the name of the plugin you are adding
    resolve: "gatsby-source-sanity",
    options: {
        projectId: process.env.SANITY_PROJECT_ID || "",
        dataset: "production",
        watchMode: true,
        token: process.env.SANITY_TOKEN || ""
    }
};

const config = {
    siteMetadata: {
        title: `${pkg.name} @ ${pkg.version}`,
        description: `${pkg.name} Website`
    },
    plugins: [
        ...generateConfig().plugins,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-styled-components",
        {
            resolve: `gatsby-source-try-ghost`,
            options: {
                ghostConfig: {
                    apiUrl: process.env.GHOST_URL,
                    contentApiKey: process.env.GHOST_TOKEN,
                    version: `v3`
                },
                // Use cache (optional, default: true)
                cacheResponse: false,
                // Show info messages (optional, default: true)
                verbose: true
            }
        },
        {
            resolve: `gatsby-plugin-ghost-images`,
            options: {
                // An array of node types and image fields per node
                // Image fields must contain a valid absolute path to the image to be downloaded
                lookup: [
                    {
                        type: `GhostPost`,
                        imgTags: [`feature_image`]
                    },
                    {
                        type: `GhostPage`,
                        imgTags: [`feature_image`]
                    },
                    {
                        type: `GhostSettings`,
                        imgTags: [`cover_image`]
                    }
                ],
                // Additional condition to exclude nodes
                // Takes precedence over lookup
                exclude: (node) => node.ghostId === undefined,
                // Additional information messages useful for debugging
                verbose: true,
                // Option to disable the module (default: false)
                disable: false
            }
        },
        {
            resolve: "gatsby-source-untappd-json",
            // resolve: require.resolve("./../gatsby-source-untappd-json"),
            options: {
                src: `./src/data/untappd.json`
            }
        },
        {
            resolve: "gatsby-source-wakatime",
            // resolve: require.resolve("./../gatsby-source-wakatime"),
            options: {
                apiKey: process.env.WAKATIME_TOKEN,
                timespan: "14 days"
            }
        },
        String(sanityConfig.options.projectId.length) > 0
            ? sanityConfig
            : undefined
    ].filter((value) => value !== undefined)
};

module.exports = config;
