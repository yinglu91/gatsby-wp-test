const createPages = require("./gatsby/createPages");

exports.createPages = async ({ actions, graphql }) => {
  await createPages({ actions, graphql });
};
