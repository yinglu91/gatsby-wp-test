import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const Page = ({ data }) => {
  const { title, content } = data.wpgraphql.page;

  return (
    <Layout>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query GET_PAGE($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
      }
    }
  }
`;

/*
{
  "data": {
    "wpgraphql": {
      "page": {
        "title": "Search",
        "content": null,
      }
    }
  }
}
*/
