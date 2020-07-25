import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import ArchivePosts from "../components/archivePosts";

const UserTemplate = ({ data }) => {
  const { name, description, posts } = data.wpgraphql.user;

  return (
    <Layout>
      <h1>User: {name}</h1>
      <p>{description}</p>
      <ArchivePosts posts={posts} />
    </Layout>
  );
};

export default UserTemplate;

export const query = graphql`
  query GET_USER($id: ID!) {
    wpgraphql {
      user(id: $id) {
        id
        name
        description
        avatar {
          url
          size
        }
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
