const path = require(`path`);

// export default
module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;

  // 1. Setup our query
  const GET_PAGES = `
    query GET_PAGES($first: Int, $after: String) {
      wpgraphql {
        pages(first: $first, after: $after, where: {parent: null}) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            pageId
            uri
            title
            isFrontPage
          }
        }
      }
    }
  `;

  const allPages = [];

  // 2. Create a function for getting pages
  const fetchPages = async vairables => {
    const response = await graphql(GET_PAGES, vairables);

    const { pageInfo, nodes } = response.data.wpgraphql.pages;
    const { endCursor, hasNextPage } = pageInfo;

    nodes.forEach(page => {
      allPages.push(page);
    });

    if (hasNextPage) {
      return fetchPages({ first: vairables.first, after: endCursor });
      // due to wp default: 10 pages, max pages: 100
    }
  };

  // 3. Loop over all the pages and call createPage

  // first call fetch pages function
  await fetchPages({ first: 100, after: null });

  allPages.forEach(page => {
    if (page.isFrontPage) {
      page.uri = "/";
    }

    createPage({
      path: page.uri,
      component: path.resolve(`./src/templates/page.js`),
      context: { id: page.id },
    });
  });
};

/*
create page: /sample-page/
*/
