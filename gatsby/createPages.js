const path = require(`path`);

// export default
module.exports = async ({ actions, graphql }) => {
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
          }
        }
      }
    }
  `;

  const allPages = [];

  // 2. Create a function for getting pages
  const fetchPages = async vairables =>
    await graphql(GET_PAGES, vairables).then(({ data }) => {
      const { pageInfo, nodes } = data.wpgraphql.pages;
      const { endCursor, hasNextPage } = pageInfo;

      nodes.map(page => {
        allPages.push(page);
      });

      if (hasNextPage) {
        return fetchPages({ first: vairables.first, after: endCursor });
        // due to wp default: 10 pages, max pages: 100
      }

      return allPages;
    });

  // 3. Map over all the pages and call createPage

  const { createPage } = actions;

  // first call fetch pages function
  await fetchPages({ first: 100, after: null }).then(allPages => {
    const pageTemplate = path.resolve(`./src/templates/page.js`);
    allPages.map(page => {
      console.log(`create page: ${page.uri}`);
      createPage({
        // path: `${page.uri}`,
        path: page.uri,
        component: pageTemplate,
        context: page, //  object {id, pageId, uri, title}
      });
    });
  });
};

/*
create page: /search/
create page: /past-events/
create page: /blog/
create page: /
create page: /privacy-policy/ying-policy/
create page: /about-us/our-history/
create page: /about-us/our-goals/
create page: /about-us/
create page: /privacy-policy/
create page: /sample-page/
*/
