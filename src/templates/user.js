import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const UserTemplate = ({ data }) => {
  const { name } = data.wpgraphql.user;

  return (
    <Layout>
      <h1>{name}</h1>
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
      }
    }
  }
`;
