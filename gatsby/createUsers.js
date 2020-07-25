const path = require(`path`);

// export default
module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;

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

  // 2. Create a function for getting users
  const fetchPages = async vairables => {
    const response = await graphql(GET_USERS, vairables);

    const { pageInfo, nodes } = response.data.wpgraphql.users;
    const { endCursor, hasNextPage } = pageInfo;

    nodes.forEach(user => {
      allUsers.push(user);
    });

    if (hasNextPage) {
      return fetchPages({ first: vairables.first, after: endCursor });
      // due to wp default: 10 users, max users: 100
    }
  };

  // 3. Loop over all the users who has posts and call createPage

  // first call fetch users function
  await fetchPages({ first: 100, after: null });

  allUsers.forEach(user => {
    console.log(`create page: /user/${user.slug}`);
    createPage({
      path: `/user/${user.slug}`,
      component: path.resolve(`./src/templates/user.js`),
      context: { id: user.id },
    });
  });
};
