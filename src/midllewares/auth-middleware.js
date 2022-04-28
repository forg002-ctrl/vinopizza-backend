import ApiError from "../exceptions/ApiError.js";
import TokenService from "../services/TokenService.js";

function checkIfAuthorized(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            next(ApiError.unauthorizedUser());
            return;
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            next(ApiError.unauthorizedUser());
            return;
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            next(ApiError.unauthorizedUser());
            return;
        }

        req.user = userData;
        next();
    } catch (error) {
        next(ApiError.unauthorizedUser());
        return;
    }
}

export default checkIfAuthorized;