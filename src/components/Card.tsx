import React, { FC } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
    color: var(--forground);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--tw-shadow);
    background-color: var(--background);
    border: 3px var(--highlight) solid;
`;

const Card: FC<{ className?: string }> = ({ className = "", children }) => {
    return <CardContainer className={className}>{children}</CardContainer>;
};

export default Card;
export { Card };
