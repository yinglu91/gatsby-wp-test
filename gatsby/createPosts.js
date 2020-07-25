const path = require(`path`);
const { node } = require("prop-types");

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
  const blogPages = [];
  let pageNumber = 0;

  // 2. Create a function for getting posts
  const fetchPosts = async vairables =>
    await graphql(GET_POSTS, vairables).then(({ data }) => {
      const { pageInfo, nodes } = data.wpgraphql.posts;
      const { endCursor, hasNextPage } = pageInfo;

      const nodeIds = nodes.map(post => post.postId);
      const postsTemplate = path.resolve(`./src/templates/posts.js`);
      const postsPath = !vairables.after
        ? `/blog/`
        : `/blog/page/${pageNumber}`;

      blogPages[pageNumber] = {
        path: postsPath,
        component: postsTemplate,
        context: {
          ids: nodeIds,
          pageNumber: pageNumber,
          hasNextPage: hasNextPage,
        },
        ids: nodeIds,
      };

      nodes.forEach(post => {
        allPosts.push(post);
      });

      if (hasNextPage) {
        pageNumber++;
        return fetchPosts({ first: vairables.first, after: endCursor });
        // due to wp default: 10 posts, max posts: 100
      }

      return allPosts;
    });

  // 3. Loop over all the posts and call createPage

  const { createPage } = actions;

  // first call fetch pages function
  await fetchPosts({ first: 2, after: null }).then(allPosts => {
    blogPages.map(page => {
      console.log(`create post archive: ${page.path}`);

      createPage(page);
    });

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
