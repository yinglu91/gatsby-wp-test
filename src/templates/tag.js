import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const TagTemplate = ({ data }) => {
  const { name } = data.wpgraphql.tag;

  return (
    <Layout>
      <h1>{name}</h1>
    </Layout>
  );
};

export default TagTemplate;

export const query = graphql`
  query GET_Tag($id: ID!) {
    wpgraphql {
      tag(id: $id) {
        id
        name
        slug
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
