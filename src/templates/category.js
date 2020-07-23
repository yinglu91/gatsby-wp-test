import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const CategoryTemplate = ({ data }) => {
  const { name } = data.wpgraphql.category;

  return (
    <Layout>
      <h1>{name}</h1>
    </Layout>
  );
};

export default CategoryTemplate;

export const query = graphql`
  query GET_Category($id: ID!) {
    wpgraphql {
      category(id: $id) {
        name
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
