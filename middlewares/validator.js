const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require("express-validator");

const uuid = uuidv4();
const { response } = require("./../config/response");

const validator = {

	blendImageValidation: () => {

        return [
			body("greetingLabel").exists().withMessage("Greeting label required").isString().withMessage("Greeting label should be string"),
			body("whoLabel").exists().withMessage("Who label required").isString().withMessage("whoLabel label should be string"),
			body("color").exists().withMessage("Color required").isString().withMessage("Color should be string"),
			body("width").exists().withMessage("Width required").isInt({ min: 1 }).withMessage("Width should be a number"),
			body("height").exists().withMessage("Height required").isInt({ min: 1 }).withMessage("Height should be a number"),
			body("size").exists().withMessage("Size required").isInt({ min: 1 }).withMessage("Size should be a number"),
			(req, res, next) => {
				req.uuid = uuid;//unique id for track the transactions - logging
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					res.status(403).json(response(403, "Validation error", errors.array()));
				} else {
					next();
				}
			},
		];
	},
};

module.exports = validator;
