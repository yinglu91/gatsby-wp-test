import React from "react";
import { graphql } from "gatsby";

import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const pages = ({ data }) => {
  const { title, content } = data.wpgraphql.page;
  return (
    <Layout>
      <SEO title="Home" />
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
};

export default pages;

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        uri
      }
    }
  }
`;
