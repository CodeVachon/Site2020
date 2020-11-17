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
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-styled-components",
        String(sanityConfig.options.projectId.length) > 0
            ? sanityConfig
            : undefined
    ].filter((value) => value !== undefined)
};

module.exports = config;
