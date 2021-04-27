const bunyan = require('bunyan');

const { LOG_LEVEL } = require('../config/constants');

const log = bunyan.createLogger({
    name: "cat-card",
    level: LOG_LEVEL,
});

module.exports = log;