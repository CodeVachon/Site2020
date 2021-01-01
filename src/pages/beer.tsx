import React, { FC } from "react";
import { SEO, BreakPoints, PageHeader } from "./../components";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

const BeerGrid = styled.div`
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    @media (max-width: ${BreakPoints.Desktop}) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: ${BreakPoints.Tablet}) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: ${BreakPoints.Mobile}) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const BeerCard = styled.div`
    border-radius: 0.4rem;
    overflow: hidden;
    box-shadow: var(--tw-shadow);
    background-color: var(--background);
    color: var(--foreground);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    a {
        color: var(--foreground);
    }
    p {
        margin: 0;
        &.beer {
            margin: 0.5rem 0;
            font-size: 1.6rem;
            font-weight: 700;
        }
        &.comments {
            font-size: 0.8rem;
            padding: 1rem;
        }
        &.type {
            font-size: 0.8rem;
        }
    }

    dl {
        padding: 0;
        margin: 1rem 0;
        display: grid;
        grid-template-columns: auto auto;
        dt,
        dd {
            margin: 0;
            padding: 0;
        }
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
        li {
            background-color: #000;
            color: #fff;
            padding: 0.2rem 0.5rem;
            border-radius: 0.25rem;
            text-transform: lowercase;
            box-shadow: var(--tw-shadow);
        }
    }
    .deets {
        padding: 1rem;
    }
`;

const ImgContainer = styled.figure`
    overflow: hidden;
    min-width: 200px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: auto;
    @media (max-width: ${BreakPoints.Mobile}) {
        min-width: 350px;
    }
`;

const BeerIndex: FC<IBeerData> = ({ data }) => {
    return (
        <>
            <SEO pageTitle="Recent Beer Activity" />
            <PageHeader>
                <h1>Recent Beer Check Ins</h1>
            </PageHeader>

            <BeerGrid>
                {data.allUntappdCheckIn.nodes.map((checkin) => (
                    <BeerCard key={checkin.checkin_id}>
                        <ImgContainer>
                            <Img
                                fluid={{
                                    ...checkin.photoUrlSharp.childImageSharp
                                        .fluid,
                                    aspectRatio: 7 / 5
                                }}
                                alt={`${checkin.brewery.name} ${checkin.beer.name}`}
                            />
                        </ImgContainer>
                        <div className="deets">
                            <p className="brewery">{checkin.brewery.name}</p>
                            <p className="beer">{checkin.beer.name}</p>
                            <p className="type">{checkin.beer.type}</p>
                            {checkin.comment && (
                                <p className="comments">{checkin.comment}</p>
                            )}
                            <dl className="ratings">
                                <dt>My Rating</dt>
                                <dd>{checkin.rating_score}</dd>
                                <dt>Global Rating</dt>
                                <dd>
                                    {checkin.global_weighted_rating_score ||
                                        checkin.global_rating_score}
                                </dd>
                            </dl>
                            {checkin.flavor_profiles && (
                                <ul className="profiles">
                                    {checkin.flavor_profiles
                                        .split(",")
                                        .map((value) => (
                                            <li key={value}>{value}</li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </BeerCard>
                ))}
            </BeerGrid>
        </>
    );
};

export default BeerIndex;

export const query = graphql`
    query {
        allUntappdCheckIn(
            limit: 24
            sort: { fields: created_at, order: DESC }
        ) {
            nodes {
                global_rating_score
                global_weighted_rating_score
                comment
                photo_url
                photoUrlSharp {
                    childImageSharp {
                        fluid(maxWidth: 600) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
                purchase_venue
                rating_score
                serving_type
                total_comments
                total_toasts
                url
                venue {
                    name
                    city
                    state
                }
                brewery {
                    name
                    city
                    state
                }
                beer {
                    name
                    type
                    ibu
                }
                checkin_id
                flavor_profiles
            }
        }
    }
`;

interface IBeerData {
    data: {
        allUntappdCheckIn: {
            nodes: {
                global_rating_score: string;
                global_weighted_rating_score: string;
                comment: string;
                photo_url: string;
                photoUrlSharp: {
                    childImageSharp: {
                        fluid: any;
                    };
                };
                purchase_venue: string;
                rating_score: string;
                serving_type: string;
                total_comments: string;
                total_toasts: string;
                url: string;
                venue: {
                    name: string;
                    city: string;
                    state: string;
                };
                brewery: {
                    name: string;
                    city: string;
                    state: string;
                };
                beer: {
                    name: string;
                    type: string;
                    ibu: string;
                };
                checkin_id: string;
                flavor_profiles: string;
            }[];
        };
    };
}
