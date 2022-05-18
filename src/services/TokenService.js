import Token from "../models/TokenModel.js";
import jwt from "jsonwebtoken";
import TokenModel from "../models/TokenModel.js";

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '10d' });
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const user = await Token.findOne({ user: userId });

        if (user) {
            user.refreshToken = refreshToken;
            return user.save();
        }

        const token = await Token.create({ user: userId, refreshToken })
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });

        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ refreshToken });

        return tokenData;
    }
}

export default new TokenService();