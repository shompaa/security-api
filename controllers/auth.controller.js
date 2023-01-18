import { loginService } from "../services/index.service.js";

export const login = async (req, res, next) => {
    try {
        const resp = await loginService(req?.body);
        return res.json({
            status: 200,
            message: 'User logged in successfully',
            data: resp
        });
    } catch (e) {
        next(e);
        return;
    }
}