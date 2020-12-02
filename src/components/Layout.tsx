import React, { FC } from "react";
import "normalize.css";
import styled, { createGlobalStyle } from "styled-components";
import { SEO } from "./SEO";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,700&family=Open+Sans&display=swap');

:root {
    --background: #333;
    --forground: #eee;
    --link: #00f;

    --card-background: #222;

    --mobilebp: 400px;
}

html {
    font-size: 16px;
}

body {
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    min-width: 350px;
}

.header {
    font-family: 'Montserrat', sans-serif;
}
`;

const LayoutDiv = styled.div`
    position: relative;
    z-index: 10;
    background-color: var(--background);
    color: var(--forground);
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    .content {
    }
    footer {
        position: relative;
        z-index: 1;
        background-color: var(--background, #333);
        a {
            color: var(--forground);
        }
    }
`;

const Layout: FC<{}> = ({ children }) => {
    return (
        <>
            <SEO />
            <GlobalStyles />
            <LayoutDiv>
                <div className="content">{children}</div>

                <footer>
                    <p>
                        &copy; Copyright {new Date().getFullYear()} CodeVachon
                    </p>
                </footer>
            </LayoutDiv>
        </>
    );
};

export default Layout;
export { Layout };
