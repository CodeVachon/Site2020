import React, { FC } from "react";
import { SEO, BreakPoints, PageHeader } from "./../components";
import { graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

const BlogGrid = styled.section`
    display: grid;
    margin: 1rem;
    gap: 1rem;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    grid-auto-flow: dense;

    .featured {
        grid-column-start: span 2;
        grid-row-start: span 2;
    }
    @media (max-width: ${BreakPoints.Tablet}) {
        grid-template-columns: 1fr;
        .featured {
            grid-column-start: span 1;
            grid-row-start: span 1;
        }
    }
`;

const BlogPost = styled.div`
    box-sizing: border-box;
    border: 1px var(--light) solid;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    .deck {
        padding: 1rem;
        a {
            color: var(--forground);
            text-decoration: none;
            border-bottom: 2px var(--background) solid;
            transition: 0.6s;
            &:hover {
                border-bottom: 2px var(--forground) solid;
            }
        }
        p:first-child {
            margin: 0;
            font-size: 1.4rem;
            line-height: 1.8rem;
        }
        .excerpt {
            margin-top: 1rem;
        }
    }
`;

const ImgContainer = styled.figure`
    overflow: hidden;
    min-width: 300px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: auto;
`;

const Card = styled.div`
    border-radius: 0.5rem;
    overflow: hidden;
    box-sizing: border-box;
    background-color: var(--background);
`;

const BlogPage: FC<{
    data: {
        blogPosts: {
            nodes: {
                excerpt: string;
                slug: string;
                url: string;
                title: string;
                featured: boolean;
                tags: {
                    name: string;
                    slug: string;
                    url: string;
                }[];
                featureImageSharp: {
                    childImageSharp: {
                        fluid: any;
                    };
                };
                id: string;
            }[];
        };
    };
}> = ({ data }) => {
    // console.log(data);

    return (
        <>
            <SEO pageTitle="Blog Posts" />
            <PageHeader>
                <h1>Blog Posts</h1>
            </PageHeader>

            <BlogGrid>
                {data.blogPosts.nodes.map((post) => {
                    const fluid =
                        post.featureImageSharp?.childImageSharp?.fluid;
                    return (
                        <Card
                            key={post.id}
                            className={post.featured ? "featured" : ""}
                        >
                            <BlogPost>
                                {fluid && (
                                    <ImgContainer>
                                        <a href={post.url} target="_blank">
                                            <Img
                                                fluid={{
                                                    ...post.featureImageSharp
                                                        .childImageSharp.fluid,
                                                    aspectRatio: 21 / 9
                                                }}
                                            />
                                        </a>
                                    </ImgContainer>
                                )}
                                <div className="deck">
                                    <p>
                                        <a href={post.url} target="_blank">
                                            {post.title}
                                        </a>
                                    </p>
                                    {(post.featured || !fluid) && (
                                        <div className="excerpt">
                                            {post.excerpt}
                                        </div>
                                    )}
                                </div>
                            </BlogPost>
                        </Card>
                    );
                })}
            </BlogGrid>
        </>
    );
};

export default BlogPage;

export const query = graphql`
    query {
        blogPosts: allGhostPost(
            sort: { order: DESC, fields: published_at }
            limit: 50
            filter: {
                visibility: { eq: "public" }
                published_at: { lt: "now" }
                access: { eq: true }
            }
        ) {
            nodes {
                id
                excerpt
                slug
                url
                title
                tags {
                    name
                    slug
                    url
                }
                featured
                featureImageSharp {
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
    }
`;
