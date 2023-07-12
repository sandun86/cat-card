const catService = require("../services/cat.service");

const catController = {
	blendImage: async (req, res) => {
		const blendImage = await catService.blendImages(req, res);
		return blendImage;
	},
};

module.exports = catController;
