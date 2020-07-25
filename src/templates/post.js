import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

const Post = ({ data }) => {
  const { title, content, author, categories, tags } = data.wpgraphql.post;

  return (
    <Layout>
      <h1>{title}</h1>
      <ul>
        <li>
          Author:{" "}
          <Link to={`/user/${author.node.slug}`}>{author.node.name}</Link>
        </li>
      </ul>
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
        uri
        author {
          node {
            name
            slug
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
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
