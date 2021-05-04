const response = (statusCode, message, data) => {
	return {
		statusCode: statusCode,
        message: message,
        data: data
	};
}

module.exports = {
    response
}


