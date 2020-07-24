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

  // 2. Create a function for getting pages
  const fetchPages = async vairables =>
    await graphql(GET_TAGS, vairables).then(({ data }) => {
      const { pageInfo, nodes } = data.wpgraphql.tags;
      const { endCursor, hasNextPage } = pageInfo;

      nodes.forEach(tag => {
        allTags.push(tag);
      });

      if (hasNextPage) {
        return fetchPages({ first: vairables.first, after: endCursor });
        // due to wp default: 10 pages, max pages: 100
      }

      return allTags;
    });

  // 3. Loop over all the pages and call createPage

  const { createPage } = actions;

  // first call fetch pages function
  await fetchPages({ first: 100, after: null }).then(allTags => {
    const tagTemplate = path.resolve(`./src/templates/tag.js`);
    allTags.forEach(tag => {
      console.log(`create page: /blog/tag/${tag.slug}`);
      createPage({
        path: `/blog/tag/${tag.slug}`,
        component: tagTemplate,
        context: { id: tag.id },
      });
    });
  });
};

/*
create page: /blog/tag/awards
*/
