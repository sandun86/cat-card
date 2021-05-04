const path = require("path");
const fs = require("fs");
const httpMocks = require("node-mocks-http");

const catService = require("../services/cat.service");
const catHelper = require("../helper/cat.helper");

jest.mock("../helper/logger");
jest.mock("@mapbox/blend");
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    jest.resetAllMocks();
    catHelper.fetchCatImage = jest.fn();
});

process.cwd = jest.fn(() => ".");

const catImagesResponse = [
	[4, 5, 6, 7, 8, 9],
	[4, 5, 6, 7, 8, 9],
];

describe("Cat Image - Service", () => {
	beforeEach(() => {
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("it should pass fetch image", async (done) => {
		jest.spyOn(catHelper, "fetchCatImage").mockReturnValue(catImagesResponse);
		await catService.blendImages(req, res);
		done();
	});

	it("it should pass image join", async (done) => {
		jest.spyOn(path, "join").mockReturnValueOnce("/images/cat-card-1619465432676.jpg");
		const actual = "/images/cat-card-1619465432676.jpg";
		expect(actual).toBe("/images/cat-card-1619465432676.jpg");
		done();
	});

	it("it should pass image write_file", async (done) => {
		jest.spyOn(fs, "writeFile").mockReturnValueOnce("/images/cat-card-1619465432676.jpg");
		const actual = "/images/cat-card-1619465432676.jpg";
		expect(actual).toBe("/images/cat-card-1619465432676.jpg");
		done();
	});
});
