const createPages = require("./gatsby/createPages");
const createPosts = require("./gatsby/createPosts");
const createCategories = require("./gatsby/createCategories");
const createTags = require("./gatsby/createTags");
const createUsers = require("./gatsby/createUsers");

exports.createPages = async ({ actions, graphql }) => {
  await createPages({ actions, graphql });
  await createPosts({ actions, graphql });
  await createCategories({ actions, graphql });
  await createTags({ actions, graphql });
  await createUsers({ actions, graphql });
};
