const path = require(`path`);

// export default
module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;

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

  // 2. Create a function for getting categories
  const fetchCategories = async vairables => {
    const response = await graphql(GET_CATEGORIES, vairables);

    const { pageInfo, nodes } = response.data.wpgraphql.categories;
    const { endCursor, hasNextPage } = pageInfo;

    nodes.forEach(category => {
      allCategories.push(category);
    });

    if (hasNextPage) {
      return fetchCategories({ first: vairables.first, after: endCursor });
      // due to wp default: 10 categories, max categories: 100
    }
  };

  // 3. Loop over all the categories and call createPage

  // first call fetch categories function
  await fetchCategories({ first: 100, after: null });

  allCategories.forEach(category => {
    console.log(`create page: /blog/category/${category.slug}`);

    createPage({
      path: `/blog/category/${category.slug}`,
      component: path.resolve(`./src/templates/category.js`),
      context: { id: category.id },
    });
  });
};

/*
create page: /blog/category/awards
*/
