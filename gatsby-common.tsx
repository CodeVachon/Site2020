import React, { ReactNode, ReactPropTypes } from "react";
import Layout from "./src/components/Layout";

/**
 * Used to Wrap the Top Level element
 *
 * Useful for setting a global layout
 */
export function wrapPageElement({
    element,
    props
}: {
    element: ReactNode;
    props: ReactPropTypes;
}) {
    return <Layout {...props}>{element}</Layout>;
}

/**
 * Used for Top Level Provisions
 */
export function wrapRootElement({ element }: { element: ReactNode }) {
    return <div>{element}</div>;
}
