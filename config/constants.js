require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    CAT_API_URL: process.env.CAT_API_URL,
    LOG_LEVEL: process.env.LOG_LEVEL,
    IMAGE_DIRECTORY: process.env.IMAGE_DIRECTORY
}