const path = require(`path`);

// export default
module.exports = async ({ actions, graphql }) => {
  // 1. Setup our query
  const GET_CATEGORIES = `
    query GET_PAGES($first: Int) {
      wpgraphql {
        categories(first: $first) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            categoryId
            slug
          }
        }
      }
    }
  `;

  const allCategories = [];

  // 2. Create a function for getting pages
  const fetchPages = async vairables =>
    await graphql(GET_CATEGORIES, vairables).then(({ data }) => {
      const { pageInfo, nodes } = data.wpgraphql.categories;
      const { endCursor, hasNextPage } = pageInfo;

      nodes.forEach(category => {
        allCategories.push(category);
      });

      if (hasNextPage) {
        return fetchPages({ first: vairables.first, after: endCursor });
        // due to wp default: 10 pages, max pages: 100
      }

      return allCategories;
    });

  // 3. Loop over all the pages and call createPage

  const { createPage } = actions;

  // first call fetch pages function
  await fetchPages({ first: 100, after: null }).then(allCategories => {
    const categoryTemplate = path.resolve(`./src/templates/category.js`);
    allCategories.forEach(category => {
      console.log(`create page: /blog/category/${category.slug}`);
      createPage({
        path: `/blog/category/${category.slug}`,
        component: categoryTemplate,
        context: { id: category.id },
      });
    });
  });
};

/*
create page: /blog/category/awards
*/
