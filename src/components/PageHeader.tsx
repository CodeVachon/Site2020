import React, { FC } from "react";
import styled from "styled-components";

const PageHeaderContainer = styled.header`
    padding: 1rem;
    h1 {
        margin: 0;
    }
    h2 {
        margin: 0;
    }
`;

const PageHeaderContainerNoPadding = styled.header`
    h1 {
        margin: 0;
    }
    h2 {
        margin: 0;
    }
`;

const PageHeader: FC<{
    className?: string;
    noPadding?: boolean;
}> = ({ className = "", noPadding = false, children }) =>
    noPadding ? (
        <PageHeaderContainerNoPadding className={className}>
            {children}
        </PageHeaderContainerNoPadding>
    ) : (
        <PageHeaderContainer className={className}>
            {children}
        </PageHeaderContainer>
    );

export default PageHeader;
export { PageHeader };
