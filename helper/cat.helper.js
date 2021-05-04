const fetch = require("node-fetch"); 

const { CAT_API_URL } = require("../config/constants");

const fetchCatImage = async (data) => {
	const { label, width, height, color, size } = data;
	const url = `${CAT_API_URL}/${label}?width=${width}&height=${height}&c=${color}&s=${size}`;

	const response = await fetch(url); 
	if (!response.ok) throw new Error("An error occurred while fetch image");

	return response.buffer();
};

module.exports = {
	fetchCatImage,
};
