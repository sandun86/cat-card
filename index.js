const { join } = require("path");
const { writeFile, access, mkdir } = require("fs").promises;
const { fs, existsSync, mkdirSync } = require("fs");

const blend = require("@mapbox/blend");
const argv = require("minimist")(process.argv.slice(2));

const { fetchCatImage } = require("./cat.service");
const logger = require("./helper/logger");

const {
	greeting = "Hello",
	who = "You",
	width = 300,
	height = 500,
	color = "Pink",
	size = 100
} = argv;
const imageDir = 'images';

async function makeDirectory(dir) {
	logger.info({ dir }, 'called to make directory');
	if (!existsSync(dir)){
		mkdirSync(dir);
		logger.info({ dir }, 'created the directory');
	}
}

async function blendCallback(error, data) {
	if (error) {
		logger.error({ error }, 'error occurred while blending images');
		process.exit(1);
	}
	await makeDirectory(imageDir);
	const path = join(process.cwd(), `/${imageDir}/cat-card-${Date.now()}.jpg`);
	logger.info({ path }, 'saving image at:');

	await writeFile(path, data, 'binary');
	logger.info('Congratz, Image successfully generated!');
}

async function start() {
	try {
		logger.info({ greeting, who, width, height, color, size }, 'fetching cat images. Received options');
		const catImages = await Promise.all([
			fetchCatImage({ label: greeting, width, height, color, size }),
			fetchCatImage({ label: who, width, height, color, size }),
		]);

		const imageOptions = {
			width: width * 2,
			height: height,
			format: "jpeg",
		}
		logger.info({ imageOptions }, 'blending received images');
		blend(
			[
				{ buffer: catImages[0], x: 0, y: 0 },
				{ buffer: catImages[1], x: width, y: 0 },
			],
			imageOptions,
			blendCallback
		);
	} catch (error) {
		logger.error({ error }, error.message);
		process.exit(1);
	}
}

start();
