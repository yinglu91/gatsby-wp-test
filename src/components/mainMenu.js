import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

const getData = graphql`
  fragment MenuFields on WPGraphQL_MenuItem {
    id
    label
    url
  }

  query Get_Menu_Items {
    wpgraphql {
      menuItems {
        nodes {
          ...MenuFields
          childItems {
            nodes {
              ...MenuFields
            }
          }
        }
      }
    }
  }
`;

const ChildMenu = ({ item }) => {
  return (
    <ul>
      {item.childItems.nodes.map(child => (
        <MenuItem item={child} />
      ))}
    </ul>
  );
};

const MenuItem = ({ item }) => {
  let hasChild = false;

  if (item.childItems && item.childItems.nodes.length) {
    hasChild = true;
  }

  return (
    <li key={item.id}>
      <Link to={item.url}>{item.label}</Link>
      {hasChild && <ChildMenu item={item} />}
    </li>
  );
};

const MainMenu = () => {
  const data = useStaticQuery(getData);
  const menu = data.wpgraphql.menuItems.nodes;

  return (
    <nav>
      <ul>
        {menu.map(item => (
          <MenuItem item={item} />
        ))}
      </ul>
    </nav>
  );
};

export default MainMenu;
