module.exports = {
  integrations: {
    bagisto: {
      location: '@vue-storefront/bagisto-api/server',
      configuration: {
        api: {
          url: 'https://3a61421c-ebaa-4715-801e-358f3e4e43e3.mock.pstmn.io' // URL of your e-commerce platform
        }
      }
    }
  }
};
