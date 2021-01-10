import React, { FC } from "react";
import "normalize.css";
import styled, { createGlobalStyle } from "styled-components";
import { SEO } from "./SEO";
import { BreakPoints } from "./BreakPoints";
import { Link } from "gatsby";
import { FaTwitter, FaLinkedin, FaNpm, FaGithub } from "react-icons/fa";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,700&family=Open+Sans&display=swap');

:root {
    --background: #333;
    --forground: #eee;
    --link: #00f;
    --highlight: #a89e0a;
    --card-background: #222;

    --mobilebp: 400px;
    --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --border-radius: 0.4rem;
    --background-rotation: 45deg;
}

html {
    font-size: 16px;
}

body {
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    min-width: 350px;
    background: linear-gradient(
        var(--background-rotation),
        #720460 0%,
        #3a036d 50%,
        rgb(30, 143, 218) 100%
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

.header {
    font-family: 'Montserrat', sans-serif;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
`;

const LayoutDiv = styled.div`
    position: relative;
    z-index: 10;
    /* background-color: var(--background); */
    color: var(--forground);
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    .content {
    }
    & > footer {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        position: relative;
        z-index: 1;
        background-color: var(--background, #333);
        font-size: 0.8rem;
        gap: 0.4rem;
        p {
            margin: 0;
        }
        a {
            color: var(--forground);
            & .icon {
                display: inline-block;
                height: 1.2em;
                width: 1.2em;
            }
        }
        .menu {
            display: flex;
            gap: 0.4rem;
            a {
                font-size: 1rem;
            }
        }
        @media (max-width: ${BreakPoints.Tablet}) {
            padding: 1rem;
            flex-direction: column-reverse;
            align-items: center;
            .menu {
                a {
                    font-size: 1.3rem;
                }
            }
        }
    }
`;

const MaxWidth = styled.section`
    max-width: 1800px;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .bar {
        padding: 0.5rem 1rem;
        background-color: #000;
        flex-grow: 1;
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
        line-height: 1.3rem;
        outline: none;
    }
    h1 {
        font-size: 1rem;
        line-height: 1.3rem;
        margin: 0;
        color: var(--forground);
        display: inline-block;
    }
    .menu {
        box-sizing: border-box;
        display: flex;
        a {
            --alpha: 1;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, var(--alpha));
            padding: 0.5rem 1rem;
            display: block;
            color: var(--forground);
            text-decoration: none;
            transition: 0.6s;
            &:hover {
                --alpha: 0.5;
            }
            &.active {
                --alpha: 0.1;
            }
            &.icon {
                padding: 0.5rem;
                @media (max-width: ${BreakPoints.Tablet}) {
                    padding: 0;
                    display: none;
                }
            }
        }
    }
`;

const Layout: FC<{}> = ({ children }) => {
    const SocialMedia = (
        <>
            <a
                className="icon"
                href="https://www.linkedin.com/in/christophervachon/"
                target="_blank"
                title="Checkout my LinkedIn Profile!"
            >
                <FaLinkedin />
            </a>
            <a
                className="icon"
                href="https://twitter.com/CodeVachon"
                target="_blank"
                title="Checkout my Twitter Profile!"
            >
                <FaTwitter />
            </a>
            <a
                className="icon"
                href="https://www.npmjs.com/~codevachon"
                target="_blank"
                title="Checkout my NPM Profile!"
            >
                <FaNpm />
            </a>
            <a
                className="icon"
                href="https://github.com/CodeVachon"
                target="_blank"
                title="Checkout my GitHub Profile!"
            >
                <FaGithub />
            </a>
        </>
    );

    return (
        <>
            <SEO />
            <GlobalStyles />
            <LayoutDiv>
                <Nav>
                    <div className="bar">
                        <Link to="/" title="About Me!">
                            <h1>Christopher Vachon</h1>
                        </Link>
                    </div>

                    <div className="menu">
                        <Link
                            activeClassName="active"
                            to={"/recent-blog-posts"}
                            title="Checkout my Recent Blog Posts"
                        >
                            Blog
                        </Link>
                        <Link
                            activeClassName="active"
                            to={"/code"}
                            title="Checkout my Recent Coding Activities"
                        >
                            Code
                        </Link>
                        <Link
                            activeClassName="active"
                            to={"/beer"}
                            title="Checkout my Recent Beer Activities"
                        >
                            Beer
                        </Link>
                        {SocialMedia}
                    </div>
                </Nav>
                <div className="content">{children}</div>

                <footer>
                    <p>
                        &copy; Copyright {new Date().getFullYear()} CodeVachon
                    </p>
                    <div className="menu">{SocialMedia}</div>
                </footer>
            </LayoutDiv>
        </>
    );
};

export default Layout;
export { Layout };
