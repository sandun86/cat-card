const fetch = require("jest-fetch-mock");
jest.setMock("node-fetch", fetch);
const httpMocks = require("node-mocks-http");
const catService = require("../services/cat.service");
const catController = require("../controllers/cat.controller");

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    jest.resetAllMocks();
    catService.blendImages = jest.fn();
});

const options = {
	label: "who",
	width: 300,
	height: 300,
	color: "red",
	size: 300,
};

const catResponse = {
	"statusCode": 200,
    "message": "You have successfully generated the image!",
    "data": {
        "greetingLabel": "Greeting",
        "whoLabel": "You",
        "color": "Red",
        "width": 300,
        "height": 500,
        "size": 100
    }
}

describe("Cat Controller", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

    it("it should pass blend images", async () => {
        jest.spyOn(catService, "blendImages").mockReturnValue(catResponse);
        await catController.blendImage(req, res);
        expect(res.statusCode).toBe(200);
    });
});
