import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const Post = ({ data }) => {
  const { title, content, author, categories, tags } = data.wpgraphql.post;

  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <ul className="meta">
        <li>
          Author:{" "}
          <Link to={`/user/${author.node.slug}`}>{author.node.name}</Link>
        </li>

        <li>
          {` // `}
          Category
          <ul>
            {categories.nodes.map(cat => (
              <li>
                <Link to={`/blog/category/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </li>

        <li>
          {` // `}
          Tag
          <ul>
            {tags.nodes.map(tag => (
              <li>
                <Link to={`/blog/tag/${tag.slug}`}>{tag.name}</Link>
              </li>
            ))}
          </ul>
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
