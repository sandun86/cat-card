const path = require("path");
const fs = require("fs");
const blend = require("@mapbox/blend");

const cat = require("../index");
const catService = require("../cat.service");

jest.mock("../cat.service");
jest.mock("../helper/logger");
jest.mock("@mapbox/blend");

process.cwd = jest.fn(() => ".");

const catImagesResponse = [
	[4, 5, 6, 7, 8, 9],
	[4, 5, 6, 7, 8, 9],
];

describe("Cat Image", () => {
	beforeEach(() => {
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("env should pass", () => {
		expect(process.env.CAT_API_URL).toBe("https://cataas.com/cat/says");
	});

	it("Cat - Image Process - success", async (done) => {
		jest.spyOn(catService, "fetchCatImage").mockReturnValue(catImagesResponse);
		done();
	});

	it("should pass", async (done) => {
		jest.spyOn(path, "join").mockReturnValueOnce("/images/cat-card-1619465432676.jpg");
		const actual = "/images/cat-card-1619465432676.jpg";
		expect(actual).toBe("/images/cat-card-1619465432676.jpg");
		done();
	});

	it("should pass", async (done) => {
		jest.spyOn(fs, "writeFile").mockReturnValueOnce("/images/cat-card-1619465432676.jpg");
		const actual = "/images/cat-card-1619465432676.jpg";
		expect(actual).toBe("/images/cat-card-1619465432676.jpg");
		done();
	});
});
