import { body, validationResult } from "express-validator";
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contais 6 caracters")
];
const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contais 6 caracters")
];
export { validate, signupValidator, loginValidator };
//# sourceMappingURL=validators.js.map