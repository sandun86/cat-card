const catService = require("../services/cat.service");

const catController = {
	blendImage: async (req, res) => {
		return await catService.blendImages(req, res);
	},
};

module.exports = catController;
