import Head from "next/head";
import React from "react";

interface PropTypes {
  title?: string;
}

const PageHead = (props: PropTypes) => {
  const { title = "Eventure" } = props;

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <link rel="icon" href="/images/general/logo.svg" type="image/x-icon" />
    </Head>
  );
};

export default PageHead;
