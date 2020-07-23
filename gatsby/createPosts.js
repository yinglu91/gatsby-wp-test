const path = require(`path`);

// export default
module.exports = async ({ actions, graphql }) => {
  // 1. Setup our query
  const GET_POSTS = `
    query GET_POSTS($first: Int, $after: String) {
      wpgraphql {
        posts(first: $first, after: $after, where: {parent: null}) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            postId
            uri
            title
          }
        }
      }
    }
  `;

  const allPosts = [];

  // 2. Create a function for getting pages
  const fetchPages = async vairables =>
    await graphql(GET_POSTS, vairables).then(({ data }) => {
      const { pageInfo, nodes } = data.wpgraphql.posts;
      const { endCursor, hasNextPage } = pageInfo;

      nodes.forEach(post => {
        allPosts.push(post);
      });

      if (hasNextPage) {
        return fetchPages({ first: vairables.first, after: endCursor });
        // due to wp default: 10 pages, max pages: 100
      }

      return allPosts;
    });

  // 3. Loop over all the pages and call createPage

  const { createPage } = actions;

  // first call fetch pages function
  await fetchPages({ first: 100, after: null }).then(allPosts => {
    const postTemplate = path.resolve(`./src/templates/post.js`);
    allPosts.forEach(post => {
      console.log(`create page: /blog${post.uri}`);
      createPage({
        path: `/blog${post.uri}`,
        component: postTemplate,
        context: { id: post.id },
      });
    });
  });
};

/*
create page: /2020/07/19/biology-is-cool/
change permalink to use post name:
create page: /biology-is-cool/
*/
