import React, { FC } from "react";
import { SEO, BreakPoints } from "./../components";
import { graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

const HomePageGrid = styled.section`
    display: grid;
    margin: 1rem;
    gap: 1rem;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    grid-auto-flow: dense;

    .featured {
        grid-column-start: span 2;
        grid-row-start: span 2;
    }
    @media (max-width: ${BreakPoints.tablet}) {
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
    grid-template-rows: clamp(150px, auto, 300px) auto;
    .deck {
        padding: 1rem;
        p {
            margin: 0;
            &:first-child {
                font-size: 1.6rem;
            }
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
    background-color: var(--card-background);
`;

const HomePage: FC<{
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
    console.log(data);

    return (
        <>
            <SEO pageTitle="Homepage" />
            <h1>HomePage</h1>
            <HomePageGrid>
                {data.blogPosts.nodes.map((post) => {
                    const fluid = post.featureImageSharp.childImageSharp.fluid;
                    return (
                        <Card
                            key={post.id}
                            className={post.featured ? "featured" : ""}
                        >
                            <BlogPost>
                                {fluid && (
                                    <ImgContainer>
                                        <Img
                                            fluid={{
                                                ...post.featureImageSharp
                                                    .childImageSharp.fluid,
                                                aspectRatio: 21 / 9
                                            }}
                                        />
                                    </ImgContainer>
                                )}
                                <div className="deck">
                                    <p>{post.title}</p>
                                    {post.featured && <div>{post.excerpt}</div>}
                                </div>
                            </BlogPost>
                        </Card>
                    );
                })}
            </HomePageGrid>
        </>
    );
};

export default HomePage;

export const query = graphql`
    query {
        blogPosts: allGhostPost(
            sort: { order: DESC, fields: published_at }
            limit: 20
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
                        fluid(maxWidth: 1200) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
    }
`;
