module.exports = {
  allowOrigin: process.env.ALLOW_ORIGIN || '*',
  allowMethods: 'POST',
  allowHeaders: 'X-Requested-With,content-type'
};
