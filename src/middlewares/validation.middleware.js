import { validationResult } from "express-validator";

export const Validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: errors.array()[0].msg,
        });
    }
    next();
}