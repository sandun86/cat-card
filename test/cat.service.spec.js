const fetch = require("jest-fetch-mock");
jest.setMock("node-fetch", fetch);

const { CAT_API_URL } = require("../config/constants");
const { fetchCatImage } = require("./../cat.service");

const options = {
	label: "who",
	width: 300,
	height: 300,
	color: "red",
	size: 300,
};

describe("Cat service", () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test("it should throw an error when fetching cat image", async () => {
		fetch.mockResolvedValueOnce({
			ok: false,
		});

		await fetchCatImage({ who: "who", width: 300, height: 300, color: "red", size: 300 }).catch((res) => {
			expect(res.message).toBe("An error occurred while fetch image");
		});
	});

	test("it should fetch the cat image with options", async () => {
		fetch.mockResolvedValueOnce({
			ok: true,
			buffer: jest.fn(),
		});
		await fetchCatImage(options);

		const qs = `width=${options.width}&height=${options.height}&c=${options.color}&s=${options.size}`;
		const url = `${CAT_API_URL}/${options.label}?${qs}`;

		expect(fetch).toHaveBeenCalledWith(url);
	});

	test("it should return the cat image", async () => {
		fetch.mockResolvedValueOnce({
			ok: true,
			buffer: async () => [4, 3, 4, 5],
		});
		const current = await fetchCatImage(options);

		expect(current).toEqual([4, 3, 4, 5]);
	});
});
