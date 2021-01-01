import React, { FC } from "react";

interface ICircleGaugeProps {
    id?: string;
    values?: number[];
    colours?: string[];
}

function generateQuickGuid() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
} // close generateQuickGuid

const DefaultCircleGaugeColours = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#ffa600",
    "#ffb242",
    "#ffbe67",
    "#ffcb8a",
    "#ffd7ac",
    "#f9e4ce",
    "#f1f1f1",
    "#cad0d6",
    "#a4b1bd",
    "#8093a3",
    "#5b758b",
    "#365973"
];

const CircleGauge: FC<ICircleGaugeProps> = ({
    id = generateQuickGuid(),
    values = [15, 35, 20, 30],
    colours = DefaultCircleGaugeColours
}) => {
    const startingOffset = 25;
    let currentSum = 0;

    const getOffset = function (value: number) {
        let thisOffset;
        if (currentSum == 0) {
            thisOffset = startingOffset;
        } else {
            thisOffset = 100 - currentSum + startingOffset;
        }
        currentSum += value;
        return thisOffset;
    }; // close getOffset

    const strokWidth = 7;

    return (
        <svg
            id={id}
            width="100%"
            height="100%"
            viewBox="0 0 42 42"
            className="donut"
        >
            <circle
                className="donut-hole"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
            ></circle>
            <circle
                className="donut-ring"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="#d2d3d4"
                strokeWidth={strokWidth}
            ></circle>

            {values.map((value, index) => {
                const thisOffset = getOffset(value);
                return (
                    <circle
                        key={id + "-" + index}
                        className="donut-segment"
                        cx="21"
                        cy="21"
                        r="15.91549430918954"
                        fill="transparent"
                        strokeWidth={strokWidth}
                        style={{
                            stroke: colours[index],
                            strokeDasharray: value + " " + (100 - value),
                            strokeDashoffset: thisOffset
                        }}
                    />
                );
            })}
        </svg>
    ); // return
};

export default CircleGauge;
export { CircleGauge, DefaultCircleGaugeColours, ICircleGaugeProps };
