import React, { FC } from "react";
import {
    SEO,
    BreakPoints,
    Card,
    PageHeader,
    CircleGauge,
    DefaultCircleGaugeColours
} from "./../components";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

const HomePageGrid = styled.section`
    display: grid;
    margin: 1rem;
    gap: 1rem;
    grid-template-columns: repeat(4, minmax(175px, 1fr));
    .full-width {
        grid-column: 1 / -1;
    }
    .blogPost {
        grid-column: span 2;
    }
    .code-data {
        display: grid;
        grid-template-columns: repeat(2, minmax(175px, 1fr));
        gap: 1rem;
        @media (max-width: ${BreakPoints.Mobile}) {
            grid-template-columns: 1fr;
        }
        padding: 0.7rem;
        grid-column: span 2;
        .color {
            margin-top: 2px;
            display: block;
            width: 1rem;
            height: 1rem;
            flex-shrink: 0;
        }
        .donut {
            width: 100%;
            height: auto;
        }
        h3 {
            margin: 0 0 1rem 0;
        }
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        li {
            padding: 0.25rem 0;
            display: flex;
            gap: 0.5rem;
            align-items: flex-start;
        }
    }
    .beer-data {
        padding: 0.7rem;
        h3 {
            margin: 0;
            text-align: center;
        }
        p {
            text-align: center;
            color: var(--highlight);
            font-weight: 700;
            font-size: 5rem;
            margin: 0;
            padding: 0;
        }
    }
    @media (max-width: ${BreakPoints.Tablet}) {
        grid-template-columns: repeat(2, minmax(175px, 1fr));
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
    min-width: 175px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: auto;
`;

const SectionFooter = styled.footer`
    grid-column: 1 / -1;
    text-align: right;
    a {
        color: var(--forground);
    }
    @media (max-width: ${BreakPoints.Mobile}) {
        text-align: center;
        margin: 0 0 1rem 0;
        a {
            display: block;
            text-align: center;
            background-color: var(--background);
            padding: 0.8rem 1rem;
            text-decoration: none;
            border-radius: var(--border-radius);
        }
    }
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
        allWakaTimeSummaryLanguages: IWakaTimeSummaryData;
        allWakaTimeSummaryProjects: IWakaTimeSummaryData;
        allUntappdCheckIn: {
            totalCount: number;
        };
        allUntappdBeer: {
            totalCount: number;
        };
        allUntappdBrewery: {
            totalCount: number;
        };
        allUntappdVenue: {
            totalCount: number;
        };
    };
}> = ({ data }) => {
    // console.log(data);

    const codeSummaryRows = [
        {
            title: "Languages",
            data: data.allWakaTimeSummaryLanguages.nodes
        },
        {
            title: "Projects",
            data: data.allWakaTimeSummaryProjects.nodes
        }
    ].map((recordSet) => {
        const remainder = recordSet.data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.percent,
            0
        );

        // console.log(recordSet.title, remainder);

        recordSet.data.push({
            name: "The Small Stuff",
            percent: 100 - remainder
        });

        return recordSet;
    });

    return (
        <>
            <SEO pageTitle="Homepage" />
            <HomePageGrid>
                <Card className="full-width">
                    <p>About Me</p>
                </Card>
                <PageHeader className="full-width" noPadding>
                    <h2>Recent Blog Posts</h2>
                </PageHeader>
                {data.blogPosts.nodes.map((post) => {
                    const fluid = post.featureImageSharp.childImageSharp.fluid;
                    return (
                        <Card key={post.id} className="blogPost">
                            <BlogPost>
                                {fluid && (
                                    <ImgContainer>
                                        <Img
                                            fluid={{
                                                ...fluid,
                                                aspectRatio: 21 / 9
                                            }}
                                        />
                                    </ImgContainer>
                                )}
                                <div className="deck">
                                    <p>{post.title}</p>
                                    {post.excerpt && <div>{post.excerpt}</div>}
                                </div>
                            </BlogPost>
                        </Card>
                    );
                })}
                <SectionFooter>
                    <Link to="/recent-blog-posts">
                        Checkout my Recent Blog Posts
                    </Link>
                </SectionFooter>

                <PageHeader className="full-width" noPadding>
                    <h2>Recent Coding Activity</h2>
                </PageHeader>
                {codeSummaryRows.map((recordSet) => (
                    <Card className="code-data" key={`code-${recordSet.title}`}>
                        <CircleGauge
                            values={recordSet.data.map((record) =>
                                Number(record.percent)
                            )}
                        />
                        <main>
                            <h3>Recent {recordSet.title}</h3>
                            <ul>
                                {recordSet.data.map((record, index) => (
                                    <li
                                        key={
                                            `${recordSet.title}-` +
                                            record.name.replace(
                                                new RegExp(
                                                    "[^a-z0-9]{1,}",
                                                    "gi"
                                                ),
                                                "-"
                                            )
                                        }
                                    >
                                        <span
                                            className="color"
                                            style={{
                                                backgroundColor:
                                                    DefaultCircleGaugeColours[
                                                        index
                                                    ]
                                            }}
                                        ></span>{" "}
                                        <span>
                                            {record.name} (
                                            {Number(record.percent).toFixed(2)}
                                            %)
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </main>
                    </Card>
                ))}

                <SectionFooter>
                    <Link to="/code">Checkout my Coding Activity</Link>
                </SectionFooter>

                <PageHeader className="full-width" noPadding>
                    <h2>Beer Activity</h2>
                </PageHeader>
                <Card className="beer-data">
                    <h3>Total Checkins</h3>
                    <p>{data.allUntappdCheckIn.totalCount}</p>
                </Card>
                <Card className="beer-data">
                    <h3>Total Beers</h3>
                    <p>{data.allUntappdBeer.totalCount}</p>
                </Card>
                <Card className="beer-data">
                    <h3>Total Breweries</h3>
                    <p>{data.allUntappdBrewery.totalCount}</p>
                </Card>
                <Card className="beer-data">
                    <h3>Total Venues</h3>
                    <p>{data.allUntappdVenue.totalCount}</p>
                </Card>
                <SectionFooter>
                    <Link to="/beer">Checkout Beer Details</Link>
                </SectionFooter>
            </HomePageGrid>
        </>
    );
};

export default HomePage;

export const query = graphql`
    query {
        blogPosts: allGhostPost(
            sort: { order: DESC, fields: published_at }
            limit: 2
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
        allWakaTimeSummaryLanguages(
            limit: 4
            sort: { fields: percent, order: DESC }
        ) {
            nodes {
                percent
                name
            }
        }
        allWakaTimeSummaryProjects(
            limit: 4
            sort: { fields: percent, order: DESC }
        ) {
            nodes {
                percent
                name
            }
        }
        allUntappdCheckIn {
            totalCount
        }
        allUntappdBeer {
            totalCount
        }
        allUntappdBrewery {
            totalCount
        }
        allUntappdVenue {
            totalCount
        }
    }
`;

interface IWakaTimeSummaryData {
    nodes: {
        percent: number;
        name: string;
    }[];
}
