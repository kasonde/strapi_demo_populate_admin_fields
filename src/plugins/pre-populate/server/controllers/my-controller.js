'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('pre-populate')
      .service('myService')
      .getWelcomeMessage();
  },
});
