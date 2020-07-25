const path = require(`path`);

// export default
module.exports = async ({ actions, graphql }) => {
  // 1. Setup our query
  const GET_TAGS = `
    query GET_TAGS($first: Int) {
      wpgraphql {
        tags(first: $first) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            tagId
            slug
          }
        }
      }
    }
  `;

  const allTags = [];

  // 2. Create a function for getting tags
  const fetchTags = async vairables => {
    const response = await graphql(GET_TAGS, vairables);

    const { pageInfo, nodes } = response.data.wpgraphql.tags;
    const { endCursor, hasNextPage } = pageInfo;

    nodes.forEach(tag => {
      allTags.push(tag);
    });

    if (hasNextPage) {
      return fetchTags({ first: vairables.first, after: endCursor });
      // due to wp default: 10 tags, max tags: 100
    }
  };

  // 3. Loop over all the tags and call createPage

  const { createPage } = actions;

  // first call fetch tags function
  await fetchTags({ first: 100, after: null });

  allTags.forEach(tag => {
    console.log(`create page: /blog/tag/${tag.slug}`);
    createPage({
      path: `/blog/tag/${tag.slug}`,
      component: path.resolve(`./src/templates/tag.js`),
      context: { id: tag.id },
    });
  });
};

/*
create page: /blog/tag/awards
*/
