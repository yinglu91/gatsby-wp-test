import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import SEO from "../components/seo";

const Posts = ({ pageContext, data }) => {
  const { pageNumber, hasNextPage } = pageContext;
  const { nodes } = data.wpgraphql.posts;

  const currentPage = pageNumber ? `- Page ${pageNumber}` : ``;

  return (
    <Layout>
      <SEO title="Posts" />
      <h1>Blog Archive {currentPage}</h1>
      {nodes.map(post => (
        <h2 key={post.id}>{post.title}</h2>
      ))}

      <Pagination pageNumber={pageNumber} hasNextPage={hasNextPage} />
    </Layout>
  );
};

export default Posts;

export const query = graphql`
  query GET_POSTS($ids: [ID]!) {
    wpgraphql {
      posts(where: { in: $ids }) {
        nodes {
          id
          title
        }
      }
    }
  }
`;

/*
{
  "data": {
    "wpgraphql": {
      "posts": {
        "nodes": [
          {
            "id": "cG9zdDo4MQ==",
            "title": "Biology is cool"
          },
          {
            "id": "cG9zdDozNA==",
            "title": "We Were Voted Best Schools"
          },
          {
            "id": "cG9zdDozMA==",
            "title": "Test Post"
          },
          {
            "id": "cG9zdDox",
            "title": "Hello world!"
          }
        ]
      }
    }
  }
}
*/
