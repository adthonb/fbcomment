var config = {};

config.facebook = {
    appID: process.env.FACEBOOK_APPID || '',
    appSecret: process.env.FACEBOOK_APPSECRET || '',
    version: process.env.FACEBOOK_VERSION || 'v2.8'
};

module.exports = config;