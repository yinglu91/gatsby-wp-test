import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import ArchivePosts from "../components/archivePosts";
import SEO from "../components/seo";

const TagTemplate = ({ data }) => {
  const { name, posts } = data.wpgraphql.tag;

  return (
    <Layout>
      <SEO title={name} />
      <h1>Tag: {name}</h1>
      <ArchivePosts posts={posts} />
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
