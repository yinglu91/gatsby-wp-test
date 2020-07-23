const createPages = require("./gatsby/createPages");
const createPosts = require("./gatsby/createPosts");
const createCategories = require("./gatsby/createCategories");

exports.createPages = async ({ actions, graphql }) => {
  await createPages({ actions, graphql });
  await createPosts({ actions, graphql });
  await createCategories({ actions, graphql });
};
