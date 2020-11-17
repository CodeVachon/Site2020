import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const SEO: FC<{
    pageTitle?: string;
}> = ({ pageTitle, children }) => {
    const recordSet = useStaticQuery(graphql`
        query DefaultQuery {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `);

    const defaults = recordSet.site?.siteMetadata || {};

    // console.log(defaults);

    return (
        <Helmet titleTemplate={`%s - ${defaults.title}`}>
            {pageTitle && <title>{pageTitle}</title>}
            <html lang="en-ca" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
            />
            <meta charSet="UTF-8" />
            {children}
        </Helmet>
    );
};

export default SEO;
export { SEO };
