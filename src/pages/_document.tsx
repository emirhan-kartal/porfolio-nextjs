import { Html, Head, Main, NextScript } from "next/document";

import {
    DocumentHeadTags,
    documentGetInitialProps,
} from "@mui/material-nextjs/v14-pagesRouter";

export default function Document(props: any) {
    return (
        <Html lang="en">
            <Head>
                <DocumentHeadTags {...props} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

Document.getInitialProps = async (ctx: any) => {
    const initialProps = await documentGetInitialProps(ctx);
    return { ...initialProps };
};
