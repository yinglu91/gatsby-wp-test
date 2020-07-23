import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const Post = ({ data }) => {
  const { title, content } = data.wpgraphql.post;

  return (
    <Layout>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Layout>
  );
};

export default Post;

export const query = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
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
