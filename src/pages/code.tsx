import React, { FC } from "react";
import {
    SEO,
    BreakPoints,
    PageHeader,
    CircleGauge,
    DefaultCircleGaugeColours,
    Card
} from "./../components";
import { graphql } from "gatsby";
import styled from "styled-components";

const WakaDataSet = styled.div`
    padding: 1rem;
    h2 {
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
        align-items: center;
    }
    .color {
        display: block;
        width: 1rem;
        height: 1rem;
    }
    .donut {
        width: 100%;
        height: auto;
    }
`;
const WakaDataSetSummary = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
    @media (max-width: ${BreakPoints.Tablet}) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: ${BreakPoints.Mobile}) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const PageData = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 1rem;
    @media (max-width: ${BreakPoints.Tablet}) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const CodeIndex: FC<IWakaTimeGraphQLData> = ({ data }) => {
    // console.log(data);

    const summaryRows = [
        {
            title: "Languages",
            data: data.allWakaTimeSummaryLanguages.nodes
        },
        {
            title: "Editors",
            data: data.allWakaTimeSummaryEditors.nodes
        },
        {
            title: "Projects",
            data: data.allWakaTimeSummaryProjects.nodes
        }
    ];

    return (
        <>
            <SEO pageTitle="Recent Coding Activity" />
            <PageHeader>
                <h1>Recent Code Activity</h1>
            </PageHeader>
            <PageData>
                {summaryRows.map((recordSet) => {
                    return (
                        <Card
                            key={`data-${recordSet.title.replace(
                                new RegExp("[^a-z09]{1,}", "g"),
                                ""
                            )}`}
                        >
                            <WakaDataSet>
                                <h2>{recordSet.title}</h2>
                                <WakaDataSetSummary>
                                    <CircleGauge
                                        values={recordSet.data.map((record) =>
                                            Number(record.percent)
                                        )}
                                    />
                                    <ul>
                                        {recordSet.data.map((record, index) => (
                                            <li
                                                key={record.name.replace(
                                                    new RegExp(
                                                        "[^a-z0-9]{1,}",
                                                        "gi"
                                                    ),
                                                    "-"
                                                )}
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
                                                    {Number(
                                                        record.percent
                                                    ).toFixed(2)}
                                                    %)
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </WakaDataSetSummary>
                            </WakaDataSet>
                        </Card>
                    );
                })}
            </PageData>
        </>
    );
};

export default CodeIndex;

export const query = graphql`
    query MyQuery {
        allWakaTimeSummaryLanguages(sort: { fields: percent, order: DESC }) {
            nodes {
                percent
                name
            }
        }
        allWakaTimeSummaryEditors(sort: { fields: percent, order: DESC }) {
            nodes {
                percent
                name
            }
        }
        allWakaTimeSummaryProjects(sort: { fields: percent, order: DESC }) {
            nodes {
                percent
                name
            }
        }
    }
`;

interface IWakaTimeSummaryData {
    nodes: {
        percent: number;
        name: string;
    }[];
}

interface IWakaTimeGraphQLData {
    data: {
        allWakaTimeSummaryLanguages: IWakaTimeSummaryData;
        allWakaTimeSummaryEditors: IWakaTimeSummaryData;
        allWakaTimeSummaryProjects: IWakaTimeSummaryData;
    };
}
