const path = require(`path`);

// export default
module.exports = async ({ actions, graphql }) => {
  // 1. Setup our query
  const GET_USERS = `
    query GET_USERS($first: Int) {
      wpgraphql {
        users(first: $first) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            userId
            slug
          }
        }
      }
    }
  `;

  const allUsers = [];

  // 2. Create a function for getting pages
  const fetchPages = async vairables =>
    await graphql(GET_USERS, vairables).then(({ data }) => {
      const { pageInfo, nodes } = data.wpgraphql.users;
      const { endCursor, hasNextPage } = pageInfo;

      nodes.forEach(user => {
        allUsers.push(user);
      });

      if (hasNextPage) {
        return fetchPages({ first: vairables.first, after: endCursor });
        // due to wp default: 10 pages, max pages: 100
      }

      return allUsers;
    });

  // 3. Loop over all the pages and call createPage

  const { createPage } = actions;

  // first call fetch pages function
  await fetchPages({ first: 100, after: null }).then(allUsers => {
    const userTemplate = path.resolve(`./src/templates/user.js`);
    allUsers.forEach(user => {
      console.log(`create page: /user/${user.slug}`);
      createPage({
        path: `/user/${user.slug}`,
        component: userTemplate,
        context: { id: user.id },
      });
    });
  });
};
