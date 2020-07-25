import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import ArchivePosts from "../components/archivePosts";
import SEO from "../components/seo";

const CategoryTemplate = ({ data }) => {
  const { name, posts } = data.wpgraphql.category;

  return (
    <Layout>
      <SEO title={name} />
      <h1>Category: {name}</h1>
      <ArchivePosts posts={posts} />
    </Layout>
  );
};

export default CategoryTemplate;

export const query = graphql`
  query GET_Category($id: ID!) {
    wpgraphql {
      category(id: $id) {
        id
        name
        slug
        posts {
          nodes {
            id
            postId
            title(format: RENDERED)
            slug
          }
        }
      }
    }
  }
`;

/*
          {
            "id": "dGVybTo1"
          },
          {
            "id": "dGVybTox"
          }
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
