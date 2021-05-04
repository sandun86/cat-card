const { join } = require("path");
const { writeFile } = require("fs").promises;
const blend = require("@mapbox/blend");

const { log } = require("../helper/logger");
const { response } = require("../config/response");
const { IMAGE_DIRECTORY } = require("../config/constants");
const { fetchCatImage } = require("../helper/cat.helper");

const catService = {

	blendImages: async (req, res) => {
		const { greetingLabel, whoLabel, width, height, color, size } = req.body;
		try {
			log.info(req.body, "fetching cat images. Received options");
			const catImages = await Promise.all([
				fetchCatImage({ label: greetingLabel, width, height, color, size }),
				fetchCatImage({ label: whoLabel, width, height, color, size }),
			]);

			const imageOptions = {
				width: width * 2,
				height: height,
				format: "jpeg",
			};
			log.info({ imageOptions }, "blending received images");
			blend(
				[
					{ buffer: catImages[0], x: 0, y: 0 },
					{ buffer: catImages[1], x: width, y: 0 },
				],
				imageOptions,
				async (error, data) => {
					if (error) {
						log.error({ error }, "error occurred while blending images");
						throw new Error(error);
					}
					try {
						const path = join(process.cwd(), `/${IMAGE_DIRECTORY}/cat-card-${Date.now()}.jpg`);
						log.info({ path }, "saving image at:");

						await writeFile(path, data, "binary");
						log.info("Congratz, Image successfully generated!");
						return res.status(200).json(response(200, "You have successfully generated the image!", req.body));
					} catch (err) {
						log.error({ err }, "error occurred while saving images");
						res.status(500).json(response(500, "System error!", err.message));
					}
				}
			);
		} catch (error) {
			log.error({ error }, error.message);
			res.status(500).json(response(500, "System error!", error.message));
		}
	},
};

module.exports = catService;

